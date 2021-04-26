import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  rent: { type: String },
  hot: { type: String },
  cold: { type: String },
  drainage: { type: String },
  electricity: { type: String },
  internet: { type: String },
});

export default mongoose.model("Price", priceSchema);
