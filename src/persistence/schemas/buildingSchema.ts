import mongoose from 'mongoose';
import floorSchema from './floorSchema';
import elevatorSchema from './elevatorSchema';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const buildingSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  name: { type: String, required: true },
  elevator:{type: [String], required: false },
  floors: {type: [String], required: false }
});


export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', buildingSchema);

