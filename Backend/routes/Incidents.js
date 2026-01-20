const router = require("express").Router();
const Incident = require("../models/Incident");

// 1. GET ALL INCIDENTS (For your React Dashboard)
// This fetches the newest incidents first
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ timestamp: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. REPORT AN INCIDENT (For Postman or Python AI)
router.post("/report", async (req, res) => {
  try {
    const newIncident = new Incident({
      type: req.body.type,
      location: req.body.location,
      severity: req.body.severity,
      description: req.body.description
    });
    
    const savedIncident = await newIncident.save();
    res.status(201).json(savedIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;