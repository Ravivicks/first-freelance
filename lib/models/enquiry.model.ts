import { EnquireProps } from "@/types";
import mongoose, { Schema, Document, Model } from "mongoose";

export const enquirySchema = new Schema<EnquireProps>(
  {
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    enquiryDescription: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const Enquiry: Model<EnquireProps> =
  mongoose.models.Enquiry ||
  mongoose.model<EnquireProps>("Enquiry", enquirySchema);

export default Enquiry;
