import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  socketId: String,
  name: String,
  coords: {
    latitude: Number,
    longitude: Number,
  },
});

export default mongoose.models.Location || mongoose.model("Location", LocationSchema);
