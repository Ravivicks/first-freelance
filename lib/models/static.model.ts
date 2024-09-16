import mongoose from "mongoose";

const StaticDataSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // Add the type field
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

// Check if the model is already compiled before defining it
const StaticData =
  mongoose.models.StaticData || mongoose.model("StaticData", StaticDataSchema);

export default StaticData;
