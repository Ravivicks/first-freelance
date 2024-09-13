import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TruckIcon,
  CreditCardIcon,
  WalletIcon,
  CheckIcon,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { calculateTotalWithGSTAndShipping, formatNumber } from "@/lib/utils";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useCartStore } from "@/stores/useCartStore";
import { IAddress } from "@/types";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default function PaymentAndShipping({
  total,
  addressData,
}: {
  total: number;
  addressData: IAddress;
}) {
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
      <CardHeader className="bg-gradient-to-r from-slate-100 to-destructive/10 py-4">
        <div className="flex items-center gap-2">
          <IndianRupee className="text-destructive" />
          <h2 className="text-lg font-semibold">Payment and Shipping</h2>
        </div>
      </CardHeader>
      <CardContent>
        {/* <div className="my-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">SHIPPING</h3>
          <RadioGroup
            value={shippingMethod}
            onValueChange={handleShippingChange}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                  shippingMethod === "express"
                    ? "border-destructive bg-destructive"
                    : "border-gray-300"
                }`}
                onClick={() => handleShippingChange("express")}
              >
                {shippingMethod === "express" && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <Label
                htmlFor="express"
                className="flex items-center cursor-pointer"
                onClick={() => handleShippingChange("express")}
              >
                <Image
                  src="/dhl.svg"
                  alt="dhl"
                  width={25}
                  height={30}
                  className="mr-2 rounded-[3px]"
                />
                <span>Express shipping (DHL)</span>
              </Label>
            </div>
          </RadioGroup>
        </div> */}

        <div className="my-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">PAYMENT</h3>
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
                htmlFor="credit-card"
                className="flex items-center cursor-pointer"
                onClick={() => handlePaymentChange("razorpay")}
              >
                <Image
                  src="/razorpay.png"
                  alt="razorpay"
                  width={20}
                  height={20}
                  className="mr-1"
                />
                {/* <CreditCardIcon className="w-5 h-5 mr-2 text-destructive" /> */}
                <span>Razorpay</span>
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
                  alt="razorpay"
                  width={15}
                  height={10}
                  className="mr-2"
                />
                {/* <WalletIcon className="w-5 h-5 mr-2 text-blue-500" /> */}
                <span>PayPal / American Express</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex mb-6">
          <Input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button className="bg-destructive hover:bg-teal-600 text-white">
            Apply
          </Button>
        </div>

        <div className="space-y-2 mb-6">
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
              I have read and accept the{" "}
              <a href="#" className="text-destructive">
                terms and conditions of sale
              </a>
              . By proceeding with the order, I confirm that I have reviewed the{" "}
              <a href="#" className="text-destructive">
                Privacy Policy
              </a>
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
          Confirm your order
        </Button>
      </CardContent>
    </Card>
  );
}
