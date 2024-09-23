"use client";
import { ChevronDown, ChevronUp, Undo2, ZapIcon, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getEstimatedDeliveryDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const ProductShiping = () => {
  const [showMore, setShowMore] = React.useState(false);
  const { locale } = useParams();
  const t = useTranslations("productShipping");
  const intro = t.raw("intro");
  const delivery = t.raw("delivery");

  return (
    <div className="text-sm -mt-6">
      <div className="w-full bg-gray-100 rounded-xl p-3 flex flex-col gap-3">
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <Undo2 className="size-6" />
          </div>
          <p>
            <span className="font-bold">{intro[0].title}</span>{" "}
            {intro[0].description}
          </p>
        </div>
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <ZapIcon className="size-6" />
          </div>
          <p>
            <span className="font-bold">{intro[1].title}</span>{" "}
            {intro[1].description}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mt-5">
          <p className="font-bold">{t("shipping.title")}</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              {t("shipping.details")}
              <span className="underline ml-1">{t("shipping.linkText")}</span>
            </p>
            <p className="pr-6 font-semibold text-xs text-muted-foreground">
              <ul className="list-disc text-xs text-muted-foreground space-y-2">
                {t
                  .raw("shipping.additionalInfo")
                  .slice(0, 1)
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}

                {showMore && (
                  <ul className="list-disc space-y-2">
                    {t
                      .raw("shipping.additionalInfo")
                      .slice(1)
                      .map((item: string, index: number) => (
                        <li key={index + 1}>{item}</li>
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
          <p className="font-bold">{t("delivery.title")}</p>
          <div className="flex flex-col gap-3">
            <p className="relative pr-6 font-semibold">
              {getEstimatedDeliveryDate()}
            </p>
            <p className="font-semibold text-muted-foreground">
              {delivery.details[0]}
            </p>
            <p className="font-semibold text-muted-foreground">
              {delivery.details[1]}
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">{t("returns.title")}</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              {t("returns.details")}
              <Link href={t("returns.linkUrl")}>
                <span className="underline ml-1">{t("returns.linkText")}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">{t("payments.title")}</p>
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
          {t("shopWithConfidence.title")}
        </p>
        <div className="flex gap-2 mb-3">
          <Shield className="size-14" />
          <div>
            <p className="font-bold">
              {t("shopWithConfidence.guarantee.title")}
            </p>
            <p className="font-semibold text-muted-foreground">
              {t("shopWithConfidence.guarantee.description")}
              <Link href={t("shopWithConfidence.guarantee.linkUrl")}>
                <span className="underline ml-1">
                  {t("shopWithConfidence.guarantee.linkText")}
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
