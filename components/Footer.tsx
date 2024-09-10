import React from "react";
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

const Footer = () => {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-gray-50 w-full py-4 flex items-center justify-center rounded-b-sm border">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="font-semibold text-black">NewsLetter</p>
          <Input
            className="w-full md:w-[300px]"
            placeholder="Enter your email"
          />
          <Button variant="destructive" className="text-center">
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
            <p>Who We Are</p>
            <p>Our Commitments</p>
            <p>What We Stand For</p>
            <p>Partner Brands</p>
            <p>Careers & Opportunities</p>
          </div>
        </div>

        {/* Important Links */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            <Bot className="text-destructive" />
            Customer Care
          </h1>
          <div className="flex flex-col gap-2">
            <p>Help & Support</p>
            <p>Order Status</p>
            <p>Delivery Information</p>
            <p>Return & Exchanges</p>
            <p>Installation Assistance</p>
          </div>
        </div>

        {/* Information */}
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-3 flex gap-2">
            {" "}
            <ShieldCheck className="text-destructive" />
            Trust
          </h1>
          <p className="mb-3">Product Guarantee</p>
          <p className="mb-3">Safe & secure payments</p>
          <p className="mb-3">Payment Options</p>
          <p className="mb-3">Data Protection Policies</p>
          <p className="mb-3">User Agreements</p>
          <p className="mb-3">Privacy & Cookie Settings</p>
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
          <p className="my-3">Online Transfer</p>
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
            <div className="flex items-center gap-2">
              <Image
                src="/Versand_TNT.png"
                alt="TNT"
                width={100}
                height={100}
              />
              <p>TNT Express track</p>
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

      {/* Bottom Bar */}
      <div className="bg-black w-full py-3 flex flex-col md:flex-row justify-between px-3 text-white text-sm ">
        <p>Our offer is aimed exclusively at commercial customers</p>
        <div className="flex gap-4 flex-col md:flex-row">
          <YoutubeIcon />
          <FacebookIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
