import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
  });

export default mongoose.model('Room', roomSchema);