import mongoose from "mongoose";

const periodSchema = new mongoose.Schema({
  date: { type: String },
  hot: { type: String },
  cold: { type: String },
  drainage: { type: String },
  electricity: { type: String },
});

export default mongoose.model("Period", periodSchema);
