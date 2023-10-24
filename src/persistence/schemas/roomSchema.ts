import mongoose from "mongoose";
import { IRoomPersistence } from "../../dataschema/IRoomPersistence";

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
  });

  export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', roomSchema);