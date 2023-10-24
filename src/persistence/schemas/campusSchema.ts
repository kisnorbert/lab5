import mongoose from "mongoose";
import buildingSchema from "./buildingSchema";
import { ICampusPersistence } from "../../dataschema/ICampusPersistence";

const campusSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    buildings: {type: [String], required: false }
  });


export default mongoose.model<ICampusPersistence & mongoose.Document>('Campus', campusSchema);
