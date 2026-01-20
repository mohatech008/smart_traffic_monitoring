const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["accident", "congestion", "roadblock", "clear"], // The types of events we track
    required: true,
  },
  location: {
    type: String, 
    required: true,
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["detected", "verified", "resolved"],
    default: "detected",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Incident", IncidentSchema);