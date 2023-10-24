import mongoose from "mongoose";
import { IElevatorPersistence } from "../../dataschema/IElevatorPersistence";

const elevatorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    elevatorFloors: {type: [String], required: false }
  });


export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', elevatorSchema);
