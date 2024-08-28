import { PriceRequestProps } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

export const priceRequestSchema = new Schema<PriceRequestProps>(
  {
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    priceDescription: { type: String },
    quantity: { type: Number },
    status: { type: String },
    reason: { type: String },
  },
  { timestamps: true }
);

const PriceRequest: Model<PriceRequestProps> =
  mongoose.models.Enquiry ||
  mongoose.model<PriceRequestProps>("PriceRequest", priceRequestSchema);

export default PriceRequest;
