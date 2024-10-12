"use client";
import { useGetBanners } from "@/features/banner/use-get-banners";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GridView = () => {
  const { data, isLoading } = useGetBanners("industrial-automation");
  const result = data?.reduce((acc, item) => {
    if (item.category) {
      // Ensure category is defined
      acc[item.category] = {
        imageId: item.imageId,
        company: item.company as string,
      };
    }
    return acc;
  }, {} as Record<string, { imageId: string; company: string }>);

  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className=" w-full">
          <div className="relative h-full w-full">
            <Link
              href={`/product-details/${result?.["1"]?.company}?type=all&brand=${result?.["1"]?.company}`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["1"]?.imageId}`}
                alt="g-1"
                fill
                className="object-fit"
                unoptimized
                loading="lazy"
              />
            </Link>
          </div>
        </div>
        <div className=" w-full">
          <div className="relative h-[300px] w-full mb-2">
            <Link
              href={`/product-details/${result?.["2"]?.company}?type=all&brand=${result?.["2"]?.company}`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["2"]?.imageId}`}
                alt="g-1"
                fill
                className="object-fit "
                unoptimized
                loading="lazy"
              />
            </Link>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="relative h-[400px] w-full">
              <Link
                href={`/product-details/${result?.["3"]?.company}?type=all&brand=${result?.["3"]?.company}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["3"]?.imageId}`}
                  alt="g-1"
                  fill
                  className="object-fit"
                  unoptimized
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="relative h-[400px] w-full">
              <Link
                href={`/product-details/${result?.["4"]?.company}?type=all&brand=${result?.["4"]?.company}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["4"]?.imageId}`}
                  alt="g-1"
                  fill
                  className="object-fit"
                  loading="lazy"
                  unoptimized
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 flex-col md:flex-row">
        <div className="relative h-[300px] w-full">
          <Link
            href={`/product-details/${result?.["5"]?.company}?type=all&brand=${result?.["5"]?.company}`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["5"]?.imageId}`}
              alt="g-1"
              fill
              className="object-fit hover:shadow-sm"
              loading="lazy"
              unoptimized
            />
          </Link>
        </div>
        <div className="relative h-[300px] w-full">
          <Link
            href={`/product-details/${result?.["6"]?.company}?type=all&brand=${result?.["6"]?.company}`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${result?.["6"]?.imageId}`}
              alt="g-1"
              fill
              className="object-fit"
              loading="lazy"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GridView;
