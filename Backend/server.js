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

{/*Middleware*/}
app.use(cors());
app.use(express.json());

{/*CREATE HTTP SERVER*/}
const server = http.createServer(app); 

{/*SETUP SOCKET.IO*/}
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

{/*Listen for connections*/}
io.on("connection", (socket) => {
  console.log("New Client Connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.id);
  });
});

{/*Make io accessible so incident can access it */}
app.set("io", io);

{/*Database Connection*/}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

{/*Routes*/}
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
