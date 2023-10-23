import mongoose from "mongoose";
import floorSchema from "./floorSchema";

const elevatorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    elevatorFloors: {type: [floorSchema], required: true}
  });


export default mongoose.model('Elevator', elevatorSchema);