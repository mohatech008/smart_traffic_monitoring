const router = require("express").Router();
const Incident = require("../models/Incident");
const jwt = require("jsonwebtoken");
//Africa's Talking SMS Setup
const credentials = {
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
};
const AfricasTalking = require('africastalking')(credentials);
const sms = AfricasTalking.SMS;
//Admin midleware
const adminOnly = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
//Traffic flow analysis endpoint
router.get("/flow", async (req, res) => {
  try {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const aggregateData = await Incident.aggregate([
      { $match: { timestamp: { $gte: last24Hours } } },
      {
        $group: {
          _id: { $hour: "$timestamp" },
          count: { $sum: 1 } 
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    const formattedData = aggregateData.map(item => ({
      time: `${item._id}:00`,
      vehicles: item.count * 15 
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ message: "Error calculating traffic flow" });
  }
});

router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ timestamp: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/report", async (req, res) => {
  try {
    const newIncident = new Incident(req.body);
    const savedIncident = await newIncident.save();
    
    const io = req.app.get("io");
    if (io) io.emit("newIncident", savedIncident);

  
    if (req.body.severity === "high" || req.body.severity === "critical") {
        
        const messageBody = `FlowSense ALERT: ${req.body.type.toUpperCase()} at ${req.body.location}.\nSeverity: ${req.body.severity.toUpperCase()}.\nPlease dispatch units immediately.`;
        
        const options = {
            to: [process.env.MY_PHONE_NUMBER],
            message: messageBody,
            
        };

        sms.send(options)
            .then(response => {
                console.log("SMS Sent via AfricasTalking:", response);
            })
            .catch(error => {
                console.error("SMS Failed:", error);
            });
    }

    res.status(201).json(savedIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Incident not found" });
    res.json({ message: "Incident deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/", adminOnly, async (req, res) => {
  try {
    await Incident.deleteMany({});
    res.json({ message: "All traffic data cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear database" });
  }
});

module.exports = router;