import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongoose";
const PaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  createdAt: { type: Date, default: Date.now },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDB();
      const payment = new Payment(req.body);
      await payment.save();
      res.status(200).json({ message: "Payment saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save payment" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
