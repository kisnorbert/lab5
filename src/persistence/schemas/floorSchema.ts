import mongoose from "mongoose";
import roomSchema from "./roomSchema";

const floorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    rooms: [roomSchema]
  });


export default mongoose.model('Floor', floorSchema);