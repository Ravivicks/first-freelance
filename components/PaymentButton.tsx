"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
interface PaymentButtonProps {
  amount: number;
}
const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    setLoading(true);
    const response = await fetch("/api/createOrder", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount }),
    });
    console.log(response);

    const { orderId } = await response.json();
    if (!orderId) {
      setLoading(false);
      return alert("Failed to create order");
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: "1000",
      currency: "INR",
      name: "PayFlex",
      description: "Test Transaction",
      order_id: orderId,
      handler: async (response: any) => {
        const paymentData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };
        await fetch("/api/savePayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        });
        router.push("/");
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    setLoading(false);
  };
  return (
    <Button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay Now"}
    </Button>
  );
};
export default PaymentButton;
