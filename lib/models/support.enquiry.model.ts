import { ISupport } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const supportSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Support: Model<ISupport> =
  mongoose.models.Support || mongoose.model<ISupport>("Support", supportSchema);

export default Support;
