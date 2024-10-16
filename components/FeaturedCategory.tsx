"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetBanners } from "@/features/banner/use-get-banners";
import Link from "next/link";
import { useTranslations } from "next-intl";

const navItems = [
  {
    title: "PLC",
    image: "/product-category/1.png",
    url: "/offers",
    company: "/featured/partner/siemens.png",
  },
  {
    title: "Drive",
    image: "/product-category/2.png",
    url: "/offers",
    company: "/featured/partner/siemens.png",
  },
  {
    title: "Generator Turbine Solar Hybrid Controller",
    image: "/product-category/5.png",
    url: "/offers",
    company: "/featured/partner/deif.png",
  },
  {
    title: "HMI",
    image: "/product-category/11.png",
    url: "/offers",
    company: "/featured/partner/proface.png",
  },
];

const FeaturedCategory = () => {
  const { data, isLoading } = useGetBanners("Featured-category");

  const t = useTranslations("featuredCategory");
  return (
    <Card className="mb-16">
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-l from-slate-100 to-green-100 py-4 px-4">
        {t("title")}
      </h1>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div className="flex flex-wrap gap-3 p-3">
        {data?.slice(0, 4).map((item, index) => (
          <Link
            href={`/categorywise-product-details/${item.category}`}
            className="rounded-xl flex flex-col flex-grow sm:flex-row justify-evenly items-center w-full sm:w-1/2 lg:w-1/5 hover:shadow-lg border p-4 transition-shadow"
            key={index}
          >
            <div className="relative mb-4 sm:mb-0 md:w-[200px] h-[200px] w-[250px] ">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${item.imageId}`}
                alt={item?.category as string}
                fill
                unoptimized
              />
            </div>
            {/* <div className="flex flex-col items-center justify-between text-center gap-4 relative">
              <div
                className={cn(
                  "relative mb-4 sm:mb-0",
                  // item.title === "HMI" ||
                  //   item.title === "Generator Turbine Solar Hybrid Controller"
                  //   ? "h-[50px]"
                  //   : "h-[30px]",
                  item.company === "DEIF"
                    ? "w-[100px] h-[50px]"
                    : item.company === "Pro-Face"
                    ? "h-[70px] w-[70px]"
                    : "w-[150px] h-[30px]"
                )}
              >
                <Image
                  src={
                    item.company === "Siemens"
                      ? "/featured/partner/siemens.png"
                      : item.company === "DEIF"
                      ? "/featured/partner/deif.png"
                      : item.company === "Pro-Face"
                      ? "/featured/partner/proface.png"
                      : "/featured/partner/siemens.png"
                  }
                  alt={item._id}
                  fill
                  unoptimized
                />
              </div>
              <h1 className="text-xl font-bold text-center sm:w-1/2">
                {item.category}
              </h1>
            </div> */}
          </Link>
        ))}
      </div>
      {/* )} */}
    </Card>
  );
};

export default FeaturedCategory;
