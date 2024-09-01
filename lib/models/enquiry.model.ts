import { EnquireProps } from "@/types";
import mongoose, { Schema, Document, Model } from "mongoose";

export const enquirySchema = new Schema<EnquireProps>(
  {
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    productId: { type: String },
    productName: { type: String },
    productPrice: { type: Number },
    cartProduct: [
      {
        quantity: { type: Number },
        productId: { type: String },
        productName: { type: String },
        productPrice: { type: Number },
      },
    ],
    enquiryDescription: { type: String },
    quantity: { type: Number },
    status: { type: String },
    reason: { type: String },
  },
  { timestamps: true }
);

const Enquiry: Model<EnquireProps> =
  mongoose.models.Enquiry ||
  mongoose.model<EnquireProps>("Enquiry", enquirySchema);

export default Enquiry;
