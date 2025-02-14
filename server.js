
import {Server} from "socket.io"; 
import http from "http";   
import mongoose from "mongoose";
import Location from "./models/Location.js";

const MONGODB_URI = "mongodb+srv://sd10072004:somesh123@cluster0.fpxvqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.SOCKET_PORT || 4000;
const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  socket.on("join", async (data) => {
    console.log("🔹 Received join event:", data);
  
    try {
      const user = await Location.findOneAndUpdate(
        { socketId: socket.id },
        { 
          name: data.name, 
          coords: { latitude: data.latitude, longitude: data.longitude } 
        },
        { upsert: true, new: true, runValidators: true }
      );
  
      console.log("✅ User location saved in DB:", user);
      
      const users = await Location.find();
      io.emit("users", users);
    } catch (error) {
      console.error("❌ Error saving location:", error);
    }
  });
  

  socket.on("position-change", async (data) => {
    try {
      await Location.findOneAndUpdate(
        { socketId: data.socketId },
        { coords: { latitude: data.latitude, longitude: data.longitude } }
      );
  
      const users = await Location.find();
      io.emit("position-change", users);
    } catch (error) {
      console.error("❌ Error updating position:", error);
    }
  });
  

  socket.on("disconnect", async () => {
    await Location.findOneAndDelete({ socketId: socket.id });

    const users = await Location.find();
    io.emit("users", users);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server listening on port ${PORT}`);
});
