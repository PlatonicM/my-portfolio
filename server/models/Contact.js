import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: 'General Inquiry' },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);

