import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
export default mongoose.model('Blog', blogSchema);
