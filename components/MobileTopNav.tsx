"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Headset, Mail, MessageSquareQuote, Phone } from "lucide-react";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";
import { useGetContacts } from "@/features/contact/use-get-contacts";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useSupportOpen } from "@/hooks/use-support-open";

const MobileTopNav = () => {
  const { onOpen } = useCommonEnquiry();
  const { onOpen: supportOpen } = useSupportOpen();
  // const { data, isLoading } = useGetContacts();
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="bg-black rounded-b-md text-xs py-2 px-4">
      <div className="flex justify-between items-center gap-2 md:gap-4">
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
          </Button>
        </div>

        {/* Quick Quote Button */}
        <MessageSquareQuote
          className="text-white cursor-pointer"
          onClick={() => onOpen("quickQuote")}
        />

        {/* Customer Support Section */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-gray-500 text-xs flex items-center"
            onClick={supportOpen}
          >
            <Headset className="text-white" />
          </Button>
        </div>

        {/* Email Link */}
        <Link
          href="mailto:sales@automationecomglobal.com"
          className="font-semibold text-[#98cfea] text-xs"
        >
          <Mail className="text-white" />
        </Link>
        {/* Phone Section */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-white text-xs flex items-center"
          >
            <Phone />
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

export default MobileTopNav;
