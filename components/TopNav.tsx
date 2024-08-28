import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Headset, Phone } from "lucide-react";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";

const TopNav = () => {
  return (
    <div className="bg-black rounded-b-md text-xs">
      <div className="flex justify-between items-center">
        <Button variant="link" className="text-white font-semibold text-xs">
          <Image
            src="/warranty.webp"
            alt="12th"
            height={30}
            width={22}
            className="mr-1"
          />
          12 month warranty
        </Button>
        <Button
          className="font-extrabold text-orange-100 text-xs"
          variant="link"
        >
          Quick Quote
        </Button>
        <Button className="font-extrabold text-gray-500 text-xs" variant="link">
          <Headset className="mr-2 size-4" /> Customer Support
        </Button>
        <Link
          href="sales@prosafeautomation.com "
          className="font-semibold text-orange-100"
        >
          sales@prosafeautomation.com{" "}
        </Link>
        <Button className="font-extrabold text-white text-xs" variant="link">
          <Phone className="mr-2 size-4" /> +91-9560796132
        </Button>
        <CountryDropdown />
      </div>
    </div>
  );
};

export default TopNav;
