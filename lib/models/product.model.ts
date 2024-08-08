import { PriceHistoryItem, ProductInfoItem, User } from "@/types";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IProduct extends Document {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  discount: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  productInformationTech?: ProductInfoItem[] | [];
  productInformationAdditional?: ProductInfoItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  productDescription: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
  sliderImages?: string[] | [];
}

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
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
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
