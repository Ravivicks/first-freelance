"use server";

import { CheckoutData, IRazorOption } from "@/types";
import Checkout from "../models/checkout.model";
import { connectToDB } from "../mongoose";
import Razorpay from "razorpay";

export async function checkout(
  checkoutData: Omit<CheckoutData, "createdAt" | "updatedAt">
) {
  try {
    await connectToDB();
    // Create the document using a plain object
    const result = await Checkout.create(checkoutData);
    return JSON.parse(JSON.stringify(result));
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
    const order = await Checkout.findOne({ orderId: txnId });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
    return null;
  }
}
