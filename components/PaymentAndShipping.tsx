"use client";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { calculateTotalWithGSTAndShipping, formatNumber } from "@/lib/utils";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useCartStore } from "@/stores/useCartStore";
import { IAddress } from "@/types";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl"; // Import the hook

export default function PaymentAndShipping({
  total,
  addressData,
}: {
  total: number;
  addressData: IAddress;
}) {
  const t = useTranslations("paymentAndShippingCard"); // Use the key corresponding to your JSON structure
  const [shippingMethod, setShippingMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [discountCode, setDiscountCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { onOpen: onCheckoutOpen } = useCheckoutOpen();
  const { cart } = useCartStore();
  const { gstAmount, shippingAmount, totalWithGSTAndShipping, discountAmount } =
    calculateTotalWithGSTAndShipping(total);

  const handleShippingChange = (value: string) => {
    setShippingMethod(value);
  };

  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-gradient-to-l from-slate-100 to-destructive py-4">
        <div className="flex items-center gap-2">
          <IndianRupee className="text-white" />
          <h2 className="text-lg font-semibold text-white">
            {t("paymentAndShipping.title")}
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            {t("paymentAndShipping.payment")}
          </h3>
          <RadioGroup value={paymentMethod} onValueChange={handlePaymentChange}>
            <div className="flex items-center space-x-2 mb-2">
              <div
                className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                  paymentMethod === "razorpay"
                    ? "border-destructive bg-destructive"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentChange("razorpay")}
              >
                {paymentMethod === "razorpay" && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <Label
                htmlFor="razorpay"
                className="flex items-center cursor-pointer"
                onClick={() => handlePaymentChange("razorpay")}
              >
                <Image
                  src="/razorpay.png"
                  alt={t("paymentAndShipping.razorpay.imageAlt")}
                  width={20}
                  height={20}
                  className="mr-1"
                />
                <span>{t("paymentAndShipping.razorpay.label")}</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                  paymentMethod === "paypal"
                    ? "border-destructive bg-destructive"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentChange("paypal")}
              >
                {paymentMethod === "paypal" && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <Label
                htmlFor="paypal"
                className="flex items-center cursor-pointer"
                onClick={() => handlePaymentChange("paypal")}
              >
                <Image
                  src="/paypal.svg"
                  alt={t("paymentAndShipping.paypal.imageAlt")}
                  width={15}
                  height={10}
                  className="mr-2"
                />
                <span>{t("paymentAndShipping.paypal.label")}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex mb-6">
          <Input
            type="text"
            placeholder={t("paymentAndShipping.discountCodePlaceholder")}
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button className="bg-destructive hover:bg-teal-600 text-white">
            {t("paymentAndShipping.applyButton")}
          </Button>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span>{t("paymentAndShipping.price")}</span>
            <span>₹{formatNumber(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("paymentAndShipping.gst")}</span>
            <span>₹ {formatNumber(gstAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("paymentAndShipping.deliveryCharges")}</span>
            <span>₹ {formatNumber(shippingAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("paymentAndShipping.discountPrice")}</span>
            <span>₹{formatNumber(discountAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>{t("paymentAndShipping.totalAmount")}</span>
            <span>₹ {formatNumber(totalWithGSTAndShipping)}</span>
          </div>
        </div>
        <Separator className="mb-2" />
        <div>
          <div className="flex">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              {t("paymentAndShipping.termsAndConditions")}
            </label>
          </div>
        </div>
        <Separator className="mb-6 mt-2" />
        <Button
          variant="destructive"
          className="w-full hover:bg-orange-600 text-white"
          onClick={() =>
            onCheckoutOpen(addressData?._id as string, [
              { paymentMethod: paymentMethod },
            ])
          }
          disabled={
            cart.length === 0 || addressData === undefined || !acceptTerms
          }
        >
          {t("paymentAndShipping.confirmOrder")}
        </Button>
      </CardContent>
    </Card>
  );
}
