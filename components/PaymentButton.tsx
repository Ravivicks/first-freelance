"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { calculateTotalWithGSTAndShipping } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useGetAddress } from "@/features/address/use-get-address";
import { useCartStore } from "@/stores/useCartStore";
import { useCreateCheckout } from "@/features/checkout/use-create-checkout";
import { CheckoutData, IAddress, OrderItem } from "@/types";

// Extend the global window object to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IProps {
  amount: number;
}

const PaymentButton = ({ amount }: IProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, id } = useCheckoutOpen();
  const { data: address } = useGetAddress(id as string);
  const { cart, clearCart } = useCartStore();

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }

  const { totalWithGSTAndShipping } = calculateTotalWithGSTAndShipping(total);

  const mutation = useCreateCheckout();
  const orderItems: OrderItem[] = cart?.map((product) => ({
    productId: product._id,
    name: product.title,
    quantity: product.quantity,
    price: product.lowestPrice,
    total: product.lowestPrice * product.quantity,
  }));

  const defaultAddress: IAddress = {
    _id: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    email: "",
    phone: "",
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const makePayment = async () => {
    setIsLoading(true);

    // make an endpoint to get this key
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const data = await fetch("/api/order/create?amount=" + amount);
    const { order } = await data?.json();
    const values: CheckoutData = {
      userId: address?.email ?? "",
      items: orderItems,
      totalAmount: totalWithGSTAndShipping,
      paymentDetails: {
        method: "razorpay", // Default before updating
        status: order.status,
        transactionId: order.id,
      },
      shippingAddress: address ?? defaultAddress,
      billingAddress: address ?? defaultAddress,
      status: "processing",
      orderId: order.id,
    };
    if (order) {
      mutation.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
    const options = {
      key: key,
      name: "automationarea@gmail.com",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response: any) {
        const data = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: user?.emailAddresses[0].emailAddress,
          }),
        });

        const res = await data.json();

        if (res?.error === false) {
          // redirect to success page
          router.replace(`/confirm-order?order=${order.id}`);
          clearCart();
        }
      },
      prefill: {
        // email: user?.emailAddresses[0].emailAddress,
        name: "automationarea",
        email: "automationarea@gmail.com",
        contact: "000000000",
      },
    };

    if (window.Razorpay) {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
        setIsLoading(false);
      });
    } else {
      console.error("Razorpay SDK failed to load.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="">
          <Button
            className="w-full my-3"
            variant="destructive"
            disabled={isLoading}
            onClick={() => makePayment()}
          >
            Proceed to payment
          </Button>
        </div>
      </Suspense>
    </>
  );
};

export default PaymentButton;
