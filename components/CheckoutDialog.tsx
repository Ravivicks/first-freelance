"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useCartStore } from "@/stores/useCartStore";
import { calculateTotalWithGSTAndShipping, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useGetAddress } from "@/features/address/use-get-address";
import { useCreateCheckout } from "@/features/checkout/use-create-checkout";
import { CheckoutData, IAddress, OrderItem, PaymentDetails } from "@/types";
import { useRouter } from "next/navigation";

const CheckoutDialog = () => {
  const router = useRouter();
  const { isOpen, onClose, id } = useCheckoutOpen();
  const { data, isLoading } = useGetAddress(id as string);

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }
  const { gstAmount, shippingAmount, totalWithGSTAndShipping, discountAmount } =
    calculateTotalWithGSTAndShipping(total);

  const mutation = useCreateCheckout();
  const orderItems: OrderItem[] = cart?.map((product) => ({
    productId: product._id,
    name: product.title,
    quantity: product.quantity,
    price: product.lowestPrice,
    total: product.lowestPrice * product.quantity,
  }));

  const paymentDetails: PaymentDetails = {
    method: "credit_card",
    status: "pending",
    transactionId: "test",
  };

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

  const values: CheckoutData = {
    userId: data?.email ?? "",
    items: orderItems,
    totalAmount: totalWithGSTAndShipping,
    paymentDetails: paymentDetails,
    shippingAddress: data ?? defaultAddress,
    billingAddress: data ?? defaultAddress,
    status: "processing",
  };

  const onHandlePayment = () => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        router.push("/confirm-order");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto max-w-full md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Please confirm you detalis before make payment of your order
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <div className="scrollable-form space-y-4 pt-4 px-2 max-h-[80vh] overflow-auto">
            <div className="mb-3">
              <Card>
                <CardContent className="p-6">
                  <h1 className="font-bold text-lg">Item Details</h1>
                  {cart.length > 0 ? (
                    cart?.map((cartItem, index) => (
                      <div key={index}>
                        <div className="flex justify-between my-3">
                          <div className="flex items-center gap-2">
                            <Image
                              src={cartItem.image}
                              alt={`item - ${index}`}
                              height={50}
                              width={50}
                              className="rounded-xl"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold text-xs">
                                {cartItem.title}
                              </p>
                              <p className="font-semibold text-xs text-muted-foreground">
                                {cartItem.currency}
                                {cartItem.lowestPrice}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              onClick={() => decreaseQuantity(cartItem._id)}
                              className="rounded-full"
                            >
                              <MinusIcon className="size-4" />
                            </Button>
                            <span>{cartItem.quantity}</span>
                            <Button
                              variant="ghost"
                              onClick={() => increaseQuantity(cartItem._id)}
                              className="rounded-full"
                            >
                              <PlusIcon className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => removeFromCart(cartItem)}
                              className="rounded-full"
                            >
                              <Trash2Icon className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full min-w-[350px]">
                      <Image
                        src="/box-empty.svg"
                        alt="empty-cart"
                        width={100}
                        height={100}
                      />
                      <p>No item in your cart</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="flex gap-3">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm space-y-2">
                    <h1 className="font-bold text-lg">Shipping Details</h1>
                    <p className="text-lg">
                      {data?.firstName} {data?.lastName}
                    </p>
                    <p>
                      {data?.address} {data?.city} - {data?.zipcode}
                    </p>

                    <p>
                      Country: {data?.country} State: {data?.state}
                    </p>
                    <p>Phone: {data?.phone}</p>
                    <p>Email-id: {data?.email}</p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex-grow">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Order Details
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Price</span>
                        <span>₹{formatNumber(total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST</span>
                        <span>₹ {formatNumber(gstAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery charges</span>
                        <span>₹ {formatNumber(shippingAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount price</span>
                        <span>₹{formatNumber(discountAmount)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>₹ {formatNumber(totalWithGSTAndShipping)}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        (Incl. of all taxes)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-4 p-2 bg-green-100 rounded-md">
              <p className="text-sm text-green-800">
                Your total Savings amount on this order
              </p>
              <p className="text-lg font-bold text-green-00">
                ₹ {formatNumber(discountAmount)}
              </p>
            </div>
            <Button
              className="w-full my-3"
              variant="destructive"
              onClick={onHandlePayment}
              disabled={mutation.isPending}
            >
              Proceed to payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
