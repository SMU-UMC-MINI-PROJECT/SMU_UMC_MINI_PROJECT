import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  major: { type: String, required: true }
});

export const Student = mongoose.model('Student', studentSchema);
