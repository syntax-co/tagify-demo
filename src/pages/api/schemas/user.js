import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    authId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required:true,
        unique:true
    },
    role: {
      type: String,
      enum: ['free', 'starter', 'pro', 'business'],
      default: 'free'
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        recentScans:[String]
      },
    },
    settings: {
      darkMode: { type: Boolean, default: true },
      receiveReports: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);


delete mongoose.connection.models.User;
export default mongoose.models.User || mongoose.model('User', userSchema);

