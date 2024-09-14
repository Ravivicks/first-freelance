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

const Footer = () => {
  const [email, setEmail] = useState("");
  const subscriberMutation = useCreateSubscriber();
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
          <p className="font-semibold text-black">NewsLetter</p>
          <Input
            className="w-full md:w-[300px]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="destructive"
            className="text-center"
            onClick={handleNewsletter}
            disabled={subscriberMutation.isPending || !email}
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-6 my-6 flex flex-col md:flex-row gap-6">
        {/* About Us */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Building2 className="text-destructive" /> Company
          </h1>
          <div className="flex flex-col gap-2">
            <Link href="/who-we-are">Who We Are</Link>
            <Link href="/our-commitments">Our Commitments</Link>
            <Link href="/what-we-stand-for">What We Stand For</Link>
            <Link href="/partner-brands">Partner Brands</Link>
            <Link href="/career-and-opportunities">
              Careers & Opportunities
            </Link>
          </div>
        </div>

        {/* Important Links */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Bot className="text-destructive" />
            Customer Care
          </h1>
          <div className="flex flex-col gap-2">
            <Link href="/help-and-support">Help & Support</Link>
            <Link href="/order-status">Order Status</Link>
            <Link href="/delivery-info">Delivery Information</Link>
            <Link href="/return-and-exchange">Return & Exchanges</Link>
            <Link href="/installation-assistance">Installation Assistance</Link>
          </div>
        </div>

        {/* Information */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            {" "}
            <ShieldCheck className="text-destructive" />
            Trust
          </h1>
          <Link href="/product-guarantee">Product Guarantee</Link>
          <Link href="/safe-and-secure-payments">Safe & secure payments</Link>
          <Link href="/payment-options">Payment Options</Link>
          <Link href="/data-protection-policies">Data Protection Policies</Link>
          <Link href="/user-agreements">User Agreements</Link>
          <Link href="/privacy-and-cookie-settings">
            Privacy & Cookie Settings
          </Link>
        </div>

        {/* Payment Method */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            {" "}
            <HandCoins className="text-destructive" />
            Payment Method
          </h1>
          <Image
            src="/payment.jpg"
            alt="Payment methods"
            width={250}
            height={200}
          />
          <p className="my-3">Online Transfer / Wire Transfer</p>
          <p>RTGS / NEFT</p>
        </div>

        {/* Shipping Method */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Truck className="text-destructive" />
            Shipping Method
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/Versand_UPS.png"
                alt="UPS"
                width={100}
                height={100}
              />
              <p>UPS Worldwide Express</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/Versand_DHL.png"
                alt="DHL"
                width={100}
                height={100}
              />
              <p>DHL Express track</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="p-3 bg-gray-50 rounded-t-sm border">
        <p className="text-xs">
          © 2024 AUTOMATION ECOM GLOBAL. All Rights Reserved. PROSAFE AUTOMATION
          is not an authorised distributor or representative of the
          manufacturers featured on this website. SIEMENS, SIMATIC ®, SITOP ®,
          SIMADYN ®, SINUMERIC ®, SIMOVERT® and others are registered trademarks
          of Siemens Aktiengesellschaft, Berlin and Munich. All trademarks owned
          by the respective companies. Subject to errors. Notice of liability:
          Despite careful control of the content, we accept no liability for the
          content of external links. The operators of the linked pages are
          solely responsible for their content.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
