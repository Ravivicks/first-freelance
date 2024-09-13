import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { connectToDB } from "@/lib/mongoose";
import Checkout from "@/lib/models/checkout.model";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    razorpayOrderId,
    razorpaySignature,
    razorpayPaymentId,
    email,
    products,
  } = await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  // connect db and update data
  await connectToDB();
  const updatedCheckout = await Checkout.findOneAndUpdate(
    { orderId: razorpayOrderId }, // Find the order by Razorpay order ID
    {
      paymentDetails: {
        method: "razorpay",
        status: "success", // Mark the payment as successful
        transactionId: razorpayPaymentId, // Store the Razorpay payment ID
      },
      status: "completed", // Update the order status
    },
    { new: true } // Return the updated document
  );
  console.log(updatedCheckout);

  if (!updatedCheckout) {
    return NextResponse.json(
      { message: "Order not found", error: true },
      { status: 404 }
    );
  } else {
    const emailContent = await generateEmailBody(
      "ORDER_CONFIRMATION",
      undefined,
      products
    );
    await sendEmail(emailContent, [
      email,
      // "anuragivinneta@gmail.com",
      // "rabbuips123@gmail.com",
    ]);
    return NextResponse.json(
      { message: "payment success", error: false },
      { status: 200 }
    );
  }
}
