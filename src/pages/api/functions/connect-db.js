import mongoose from 'mongoose';



/* --- internal helper: connect once per runtime --- */
const connectDB = async () => {
  if (mongoose.connection.readyState) return;            // already connected
  await mongoose.connect(process.env.MONGO_URI);
};


export default connectDB;