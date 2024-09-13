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

interface IProps {
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
    paypal: any;
  }
}

const PaymentButton = ({ amount }: IProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, id, data: PSData } = useCheckoutOpen(); // added data for payment method
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
    const loadPaymentScripts = () => {
      const razorpayScript = document.createElement("script");
      razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      razorpayScript.async = true;
      document.body.appendChild(razorpayScript);

      const paypalScript = document.createElement("script");
      paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
      paypalScript.async = true;
      document.body.appendChild(paypalScript);
    };

    loadPaymentScripts();
  }, []);

  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const data = await fetch("/api/order/create?amount=" + amount);
    const { order } = await data?.json();
    const values: CheckoutData = {
      userId: address?.email ?? "",
      items: orderItems,
      totalAmount: totalWithGSTAndShipping,
      paymentDetails: {
        method: PSData?.[0]?.paymentMethod as string,
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
      key,
      name: "automationarea@gmail.com",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      handler: async (response: any) => {
        const verification = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: user?.emailAddresses[0].emailAddress,
            products: orderItems,
          }),
        });

        const res = await verification.json();
        if (!res.error) {
          router.replace(`/confirm-order?order=${order.id}`);
          clearCart();
        }
      },
      prefill: {
        name: user?.fullName ?? "",
        email: user?.emailAddresses[0].emailAddress ?? "",
        contact: address?.phone ?? "",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", () => {
      alert("Payment failed. Please try again.");
      setIsLoading(false);
    });
  };

  const handlePayPalPayment = () => {
    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalWithGSTAndShipping.toString(),
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          return actions.order.capture().then(function (details: any) {
            router.replace(`/confirm-order?order=${details.id}`);
            clearCart();
          });
        },
        onError: (err: any) => {
          console.error(err);
          setIsLoading(false);
        },
      })
      .render("#paypal-button-container");
  };

  const handlePayment = () => {
    const selectedPaymentMethod = PSData?.[0]?.paymentMethod;

    if (selectedPaymentMethod === "paypal") {
      handlePayPalPayment();
    } else {
      handleRazorpayPayment();
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full my-3">
          {PSData?.[0]?.paymentMethod === "paypal" && (
            <div id="paypal-button-container" />
          )}
          <Button
            className="w-full"
            variant="destructive"
            disabled={isLoading}
            onClick={handlePayment}
          >
            Proceed to payment
          </Button>
        </div>
      </Suspense>
    </>
  );
};

export default PaymentButton;
