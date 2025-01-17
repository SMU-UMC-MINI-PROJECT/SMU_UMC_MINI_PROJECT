import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  major: { type: String, required: true },
});

export const Student = mongoose.model('Student', studentSchema);
