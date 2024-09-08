"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useCartStore } from "@/stores/useCartStore";
import { calculateTotalWithGSTAndShipping, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { useGetAddress } from "@/features/address/use-get-address";
import { useRouter } from "next/navigation";
import Cart from "./Cart";
import PaymentButton from "./PaymentButton";

const CheckoutDialog = () => {
  const router = useRouter();
  const { isOpen, onClose, id } = useCheckoutOpen();
  const { data: address, isLoading } = useGetAddress(id as string);
  const { cart, clearCart } = useCartStore();

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }

  const { gstAmount, shippingAmount, totalWithGSTAndShipping, discountAmount } =
    calculateTotalWithGSTAndShipping(total);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto max-w-full md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Please confirm your details before making payment of your order
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
                  <Cart />
                </CardContent>
              </Card>
            </div>
            <div className="flex gap-3">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm space-y-2">
                    <h1 className="font-bold text-lg">Shipping Details</h1>
                    <p className="text-lg">
                      {address?.firstName} {address?.lastName}
                    </p>
                    <p>
                      {address?.address} {address?.city} - {address?.zipcode}
                    </p>

                    <p>
                      Country: {address?.country} State: {address?.state}
                    </p>
                    <p>Phone: {address?.phone}</p>
                    <p>Email-id: {address?.email}</p>
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
                Your total savings amount on this order
              </p>
              <p className="text-lg font-bold text-green-00">
                ₹ {formatNumber(discountAmount)}
              </p>
            </div>
            {/* <Button
              className="w-full my-3"
              variant="destructive"
              onClick={makePayment}
              disabled={mutation.isPending || cart.length === 0}
            >
              Proceed to payment
            </Button> */}
            <PaymentButton amount={1} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
