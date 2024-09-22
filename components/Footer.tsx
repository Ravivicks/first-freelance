"use client";
import React, { useState } from "react";
import {
  Bot,
  Building2,
  FacebookIcon,
  HandCoins,
  QrCodeIcon,
  ShieldCheck,
  Truck,
  YoutubeIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCreateSubscriber } from "@/features/subscriber/use-add-subcriber";
import Link from "next/link";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { useParams } from "next/navigation";

const Footer = () => {
  const { locale } = useParams();
  const [email, setEmail] = useState("");
  const subscriberMutation = useCreateSubscriber();
  const {
    data: staticData,
    isLoading: staticLoading,
    error,
  } = useStaticDataStore();
  const values = {
    email: email,
    status: "New",
  };
  const handleNewsletter = () => {
    subscriberMutation.mutate(values, {
      onSuccess: () => setEmail(""),
    });
  };
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-gray-50 w-full py-4 flex items-center justify-center rounded-b-sm border">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="font-semibold text-black">
            {staticData ? staticData?.footer?.newsletter?.title : "NewsLetter"}
          </p>
          <Input
            className="w-full md:w-[300px]"
            placeholder={
              staticData
                ? staticData?.footer?.newsletter?.placeholder
                : "Enter your email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="destructive"
            className="text-center"
            onClick={handleNewsletter}
            disabled={subscriberMutation.isPending || !email}
          >
            {staticData
              ? staticData?.footer?.newsletter?.subscribeButton
              : "Subscribe"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-6 my-6 flex flex-col md:flex-row gap-6">
        {/* About Us */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Building2 className="text-destructive" />{" "}
            {staticData ? staticData?.footer?.company?.title : "Company"}
          </h1>
          <div className="flex flex-col gap-2">
            {staticData &&
              staticData?.footer?.company?.links.map(
                (link: any, index: number) => (
                  <Link href={`/${locale}${link?.url}`} key={index}>
                    {link?.text}
                  </Link>
                )
              )}
          </div>
        </div>

        {/* Important Links */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Bot className="text-destructive" />
            {staticData
              ? staticData?.footer?.customerCare?.title
              : " Customer Care"}
          </h1>
          <div className="flex flex-col gap-2">
            {staticData &&
              staticData?.footer?.customerCare?.navItems.map(
                (link: any, index: number) => (
                  <Link href={`/${locale}${link?.url}`} key={index}>
                    {link?.text}
                  </Link>
                )
              )}
          </div>
        </div>

        {/* Information */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            {" "}
            <ShieldCheck className="text-destructive" />
            {staticData ? staticData?.footer?.trust?.title : "Trust"}
          </h1>
          <div className="flex flex-col gap-2">
            {staticData &&
              staticData?.footer?.trust?.links.map(
                (link: any, index: number) => (
                  <Link href={`/${locale}${link?.url}`} key={index}>
                    {link?.text}
                  </Link>
                )
              )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            {" "}
            <HandCoins className="text-destructive" />
            {staticData
              ? staticData?.footer?.paymentMethod?.title
              : "Payment Method"}
          </h1>
          <Image
            src="/payment.webp"
            alt="Payment methods"
            width={250}
            height={200}
            loading="lazy"
          />
          {staticData &&
            staticData?.footer?.paymentMethod?.methods.map(
              (link: any, index: number) => <p key={index}>{link}</p>
            )}
        </div>

        {/* Shipping Method */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Truck className="text-destructive" />
            {staticData
              ? staticData?.footer?.shippingMethod?.title
              : "Shipping Method"}
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/Versand_UPS.webp"
                alt="UPS"
                width={100}
                height={100}
                loading="lazy"
              />
              <p>UPS Worldwide Express</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/Versand_DHL.webp"
                alt="DHL"
                width={100}
                height={100}
                loading="lazy"
              />
              <p>DHL Express track</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="p-3 bg-gray-50 rounded-t-sm border">
        <p className="text-xs">
          ©{" "}
          {staticData
            ? staticData?.footer?.bottomText
            : `2024 AUTOMATION ECOM GLOBAL. All Rights Reserved. PROSAFE AUTOMATION
          is not an authorised distributor or representative of the
          manufacturers featured on this website. SIEMENS, SIMATIC ®, SITOP ®,
          SIMADYN ®, SINUMERIC ®, SIMOVERT® and others are registered trademarks
          of Siemens Aktiengesellschaft, Berlin and Munich. All trademarks owned
          by the respective companies. Subject to errors. Notice of liability:
          Despite careful control of the content, we accept no liability for the
          content of external links. The operators of the linked pages are
          solely responsible for their content.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
