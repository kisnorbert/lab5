import mongoose from "mongoose";
import { IFloorPersistence } from "../../dataschema/IFloorPersistence";

const floorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    rooms: {type: [String], required: false }
  });


export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', floorSchema);
