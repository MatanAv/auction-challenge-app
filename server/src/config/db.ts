import mongoose from 'mongoose';
import config from '.';

const MONGO_URI = `${config.db.BASE_URI}/${config.db.URI_PARAMS}` || '';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
