import mongoose from "mongoose";
import buildingSchema from "./buildingSchema";

const campusSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    buildings: {type: [buildingSchema], required: true}
  });


export default mongoose.model('Campus', campusSchema);