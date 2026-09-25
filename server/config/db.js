import mongoose from 'mongoose';

let cachedConn = null;

export const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
  try {
    cachedConn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
    return true;
  } catch (err) {
    console.warn('MongoDB connection issue:', err.message);
    return false;
  }
};

