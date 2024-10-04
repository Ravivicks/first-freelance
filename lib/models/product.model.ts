import { IProduct } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const productSchema: Schema = new Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    sliderImages: { type: Array, required: true },
    title: { type: String, required: true },
    discount: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    brand: { type: String, required: true },
    type: { type: String },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    pdfFile: { type: String },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    subCategory: { type: String },
    category: { type: String },
    machineCode: { type: String },
    productDescription: { type: String },
    productInformationTech: [
      {
        name: { type: String },
        value: { type: String },
      },
    ],
    productInformationAdditional: [
      {
        name: { type: String },
        value: { type: String },
      },
    ],
    reviewsCount: { type: Number },
    stars: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String, required: true } }],
    default: [],
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
