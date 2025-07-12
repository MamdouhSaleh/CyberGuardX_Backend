import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },      
    sessionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } 
);

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  refreshTokens: {
    type: [refreshTokenSchema],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
