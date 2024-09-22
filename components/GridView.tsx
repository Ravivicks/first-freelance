"use client";
import { useGetBanners } from "@/features/banner/use-get-banners";
import Image from "next/image";
import React from "react";

const GridView = () => {
  const { data, isLoading } = useGetBanners("industrial-automation");
  const result = data?.reduce((acc, item) => {
    if (item.category) {
      // Ensure category is defined
      acc[item.category] = item.imageId;
    }
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className=" w-full">
          <div className="relative h-full w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["1"]}`}
              alt="g-1"
              fill
              className="object-fit"
              unoptimized
              loading="lazy"
            />
          </div>
        </div>
        <div className=" w-full">
          <div className="relative h-[300px] w-full mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["2"]}`}
              alt="g-1"
              fill
              className="object-fit "
              unoptimized
              loading="lazy"
            />
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="relative h-[400px] w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["3"]}`}
                alt="g-1"
                fill
                className="object-fit"
                unoptimized
                loading="lazy"
              />
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["4"]}`}
                alt="g-1"
                fill
                className="object-fit"
                loading="lazy"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 flex-col md:flex-row">
        <div className="relative h-[300px] w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["5"]}`}
            alt="g-1"
            fill
            className="object-fit hover:shadow-sm"
            loading="lazy"
            unoptimized
          />
        </div>
        <div className="relative h-[300px] w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["6"]}`}
            alt="g-1"
            fill
            className="object-fit"
            loading="lazy"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default GridView;
