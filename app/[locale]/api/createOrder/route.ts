import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.method === "POST") {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
    });
    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await axios.get("https://api.razorpay.com/v1/orders");
    res.status(200).json({ orderId: order });
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
}
//   else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
