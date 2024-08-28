import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Headset, Phone } from "lucide-react";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";

const TopNav = () => {
  return (
    <div className="bg-black rounded-b-md text-xs py-2 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        {/* Warranty Section */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="text-white font-semibold text-xs flex items-center"
          >
            <Image
              src="/images/warranty.webp"
              alt="12 month warranty"
              height={30}
              width={22}
              className="mr-1"
            />
            12 month warranty
          </Button>
        </div>

        {/* Quick Quote Button */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-orange-100 text-xs"
          >
            Quick Quote
          </Button>
        </div>

        {/* Customer Support Section */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-gray-500 text-xs flex items-center"
          >
            <Headset className="mr-2" size={16} />
            Customer Support
          </Button>
        </div>

        {/* Email Link */}
        <div className="flex items-center">
          <Link
            href="mailto:sales@prosafeautomation.com"
            className="font-semibold text-orange-100 text-xs"
          >
            sales@prosafeautomation.com
          </Link>
        </div>

        {/* Phone Section */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-white text-xs flex items-center"
          >
            <Phone className="mr-2" size={16} />
            +91-9560796132
          </Button>
        </div>

        {/* Country Dropdown */}
        <div className="flex items-center">
          <CountryDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
