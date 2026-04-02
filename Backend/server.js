const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/Incidents");
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New Client Connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.id);
  });
});

app.set("io", io);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
