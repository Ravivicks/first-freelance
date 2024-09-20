"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Headset, Loader2, Phone } from "lucide-react";
import Link from "next/link";
import CountryDropdown from "./CountryDropdown";
import { useGetContacts } from "@/features/contact/use-get-contacts";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useSupportOpen } from "@/hooks/use-support-open";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { useParams } from "next/navigation";

const TopNav = () => {
  const { locale } = useParams();
  const { data, isLoading } = useGetContacts();
  const { onOpen } = useCommonEnquiry();
  const { onOpen: supportOpen } = useSupportOpen();
  useFetchStaticData(locale as string, "home");
  const {
    data: staticData,
    isLoading: staticLoading,
    error,
  } = useStaticDataStore();

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
              width={30}
              className="mr-1"
            />
            {staticData ? staticData?.page1?.warranty : "12 month warranty"}
          </Button>
        </div>

        {/* Quick Quote Button */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-[#98cfea] text-xs"
            onClick={() => onOpen("quickQuote")}
          >
            {staticData ? staticData?.page1?.quickQuote : "Quick Quote"}
          </Button>
        </div>

        {/* Customer Support Section */}
        {/* {staticLoading ? (
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        ) : ( */}
        <div className="flex items-center">
          <Button
            variant="link"
            className="font-extrabold text-gray-500 text-xs flex items-center"
            onClick={supportOpen}
          >
            <Headset className="mr-2" size={16} />
            {staticData
              ? staticData?.page1?.customerSupport
              : "Customer Support"}
          </Button>
        </div>
        {/* )} */}

        {/* Email Link */}
        {isLoading ? (
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        ) : (
          <div className="flex items-center">
            <Link
              href="mailto:sales@prosafeautomation.com"
              className="font-semibold text-[#98cfea] text-xs"
            >
              {data?.[0]?.email}
            </Link>
          </div>
        )}

        {/* Phone Section */}
        {isLoading ? (
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        ) : (
          <div className="flex items-center">
            <Button
              variant="link"
              className="font-extrabold text-white text-xs flex items-center"
            >
              <Phone className="mr-2" size={16} />
              {data?.[0]?.phone}
            </Button>
          </div>
        )}

        {/* Country Dropdown */}
        <div className="flex items-center">
          <CountryDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
