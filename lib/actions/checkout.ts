"use server";

import { CheckoutData, IRazorOption } from "@/types";
import Checkout from "../models/checkout.model";
import { connectToDB } from "../mongoose";
import Razorpay from "razorpay";

export async function checkout(
  // checkoutData: Omit<CheckoutData, "createdAt" | "updatedAt">,
  options: IRazorOption
) {
  try {
    await connectToDB();
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
    });
    const order = await razorpay.orders.create(options);

    // Create the document using a plain object
    // if (order) {
    // initializeRazorpay();
    // const result = await Checkout.create(checkoutData);
    return JSON.parse(JSON.stringify(order));
    // }
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
}

export async function getOrderById(
  txnId: string
): Promise<CheckoutData | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const order = await Checkout.findOne({ _id: txnId });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
    return null;
  }
}
