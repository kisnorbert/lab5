import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  name: { type: String, required: true },
  floors: { type: [String], required: true }
});

export default mongoose.model('Building', buildingSchema);
