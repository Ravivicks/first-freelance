"use client";
import {
  ChevronDown,
  ChevronUp,
  InfoIcon,
  Shield,
  Undo2,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getEstimatedDeliveryDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

const ProductShiping = () => {
  const [showMore, setShowMore] = React.useState(false);
  const { locale } = useParams();
  useFetchStaticData(locale as string, "ps");
  const { data: staticData, isLoading, error } = useStaticDataStore();

  const additionalInfo = staticData?.productShipping?.shipping
    ?.additionalInfo || [
    "For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.",
  ];

  const fallbackAdditionalInfo = [
    "For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.",
    "Orders are shipped within 1-2 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.",
    "AUTOMATION ECOM GLOBAL is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 1-2 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.",
    "Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.",
  ];

  return (
    <div className="text-sm -mt-6">
      <div className=" w-full bg-gray-100 rounded-xl p-3 flex flex-col gap-3">
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <Undo2 className="size-6" />
          </div>
          <p>
            <span className="font-bold">
              {staticData
                ? staticData?.productShipping?.intro?.[0]?.title
                : `Breathe easy.`}
            </span>{" "}
            {staticData
              ? staticData?.productShipping?.intro?.[0]?.description
              : `Free returns.`}
          </p>
        </div>
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <ZapIcon className="size-6  " />
          </div>
          <p>
            <span className="font-bold">
              {staticData
                ? staticData?.productShipping?.intro?.[1]?.title
                : `People want this.`}
            </span>{" "}
            {staticData
              ? staticData?.productShipping?.intro?.[1]?.description
              : `31 people are
            watching this.`}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mt-5">
          <p className=" font-bold">
            {staticData
              ? staticData?.productShipping?.shipping?.title
              : `Shipping`}
            :
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              {staticData
                ? staticData?.productShipping?.shipping?.details
                : `US $1.00 Standard Shipping from India to worldwide.`}
              <span className="underline ml-1">
                {staticData
                  ? staticData?.productShipping?.shipping?.linkText
                  : `See details`}
              </span>
            </p>
            <p className="pr-6 font-semibold text-xs text-muted-foreground">
              <ul className="list-disc text-xs text-muted-foreground space-y-2">
                {additionalInfo
                  .slice(0, 1)
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}

                {showMore && (
                  <ul className="list-disc space-y-2">
                    {additionalInfo
                      .slice(1)
                      .map((item: string, index: number) => (
                        <li key={index + 1}>{item}</li>
                      ))}
                    {!staticData &&
                      fallbackAdditionalInfo.map((item, index) => (
                        <li key={index + additionalInfo.length}>{item}</li>
                      ))}
                  </ul>
                )}
              </ul>
              <Button
                variant="link"
                className="text-black text-xs font-semibold p-0"
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? "Show more" : "Show less"}
                {!showMore ? (
                  <ChevronDown className="size-4 ml-1 mt-0.5" />
                ) : (
                  <ChevronUp className="size-4 ml-1 mt-0.5" />
                )}
              </Button>
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <p className="font-bold">
            {staticData
              ? staticData?.productShipping?.delivery?.title
              : `Delivery:`}
          </p>
          <div className="flex flex-col gap-3">
            <p className="relative pr-6 font-semibold ">
              {getEstimatedDeliveryDate()}
            </p>
            <p className=" font-semibold text-muted-foreground">
              {staticData
                ? staticData?.productShipping?.delivery?.details?.[0]
                : `Please note the delivery estimate is greater than 11 business days.`}
            </p>
            <p className="font-semibold text-muted-foreground">
              {staticData
                ? staticData?.productShipping?.delivery?.details?.[1]
                : `Please allow additional time if international delivery is subject
              to customs processing.`}
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">
            {staticData
              ? staticData?.productShipping?.returns?.title
              : `Shipping`}
            :
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              {staticData
                ? staticData?.productShipping?.returns?.details
                : `30 days returns. Seller pays for return shipping.`}
              <Link href="/cancellationandrefund">
                <span className="underline ml-1">
                  {staticData
                    ? staticData?.productShipping?.returns?.linkText
                    : `See details`}
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">
            {staticData
              ? staticData?.productShipping?.payments?.title
              : `Payments:`}
          </p>
          <div className="flex flex-col gap-3">
            <Image
              src="/images/payment-mode.png"
              alt="paymet"
              width={400}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="border-t-2 border-b-2">
        <p className="py-3 font-bold text-lg">
          {staticData
            ? staticData?.productShipping?.shopWithConfidence?.title
            : `Shop with confidence`}
        </p>
        <div className="flex gap-2 mb-3">
          <Shield className="size-14" />
          <div>
            <p className="font-bold">
              {staticData
                ? staticData?.productShipping?.shopWithConfidence?.guarantee
                    ?.title
                : `Comapny Moneyback Guarantee`}
            </p>
            <p className="font-semibold text-muted-foreground">
              {staticData
                ? staticData?.productShipping?.shopWithConfidence?.guarantee
                    ?.description
                : `Get the item you ordered or your money back. Learn more`}
              <Link href="/product-guarantee">
                <span className="underline ml-1">
                  {staticData
                    ? staticData?.productShipping?.shopWithConfidence?.guarantee
                        ?.linkText
                    : `Learn more`}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShiping;
