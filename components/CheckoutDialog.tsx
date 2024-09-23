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
import { useTranslations } from "next-intl";

const CheckoutDialog = () => {
  const t = useTranslations("checkoutDialog");
  const router = useRouter();
  const { isOpen, onClose, id, data } = useCheckoutOpen();
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
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <div className="scrollable-form space-y-4 pt-4 px-2 max-h-[80vh] overflow-auto">
            <div className="mb-3">
              <Card>
                <CardContent className="p-3 text-sm">
                  <h1 className="font-bold text-lg mb-4">
                    {t("paymentMethod.header")}
                  </h1>
                  <div className="flex">
                    <p>
                      {t("paymentMethod.selectedMethod")}{" "}
                      <span className="font-semibold">
                        {" "}
                        {data?.[0]?.paymentMethod}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mb-3">
              <Card>
                <CardContent className="p-6">
                  <h1 className="font-bold text-lg">
                    {t("itemDetails.header")}
                  </h1>
                  <Cart />
                </CardContent>
              </Card>
            </div>
            <div className="flex gap-3">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm space-y-2">
                    <h1 className="font-bold text-lg">
                      {t("shippingDetails.header")}
                    </h1>
                    <p className="text-lg">
                      {address?.firstName} {address?.lastName}
                    </p>
                    <p>
                      {address?.address} {address?.city} - {address?.zipcode}
                    </p>

                    <p>
                      {t("shippingDetails.country")} {address?.country}{" "}
                      {t("shippingDetails.state")} {address?.state}
                    </p>
                    <p>
                      {t("shippingDetails.phone")} {address?.phone}
                    </p>
                    <p>
                      {t("shippingDetails.email")} {address?.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex-grow">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      {t("orderDetails.header")}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t("orderDetails.price")}</span>
                        <span>₹{formatNumber(total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("orderDetails.gst")}</span>
                        <span>₹ {formatNumber(gstAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("orderDetails.deliveryCharges")}</span>
                        <span>₹ {formatNumber(shippingAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("orderDetails.discountPrice")}</span>
                        <span>₹{formatNumber(discountAmount)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>{t("orderDetails.totalAmount")}</span>
                        <span>₹ {formatNumber(totalWithGSTAndShipping)}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t("orderDetails.inclOfTaxes")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-4 p-2 bg-green-100 rounded-md">
              <p className="text-sm text-green-800">{t("savings.message")}</p>
              <p className="text-lg font-bold text-green-00">
                {t("savings.amountLabel")} {formatNumber(discountAmount)}
              </p>
            </div>
            <PaymentButton amount={1} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
