"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useGetBanners } from "@/features/banner/use-get-banners";
import Loader from "./Loader";

const HeroCarousel = () => {
  const { data, isLoading } = useGetBanners("home");

  return (
    <div className="relative w-full rounded-full">
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel className="relative rounded-xl">
          <CarouselContent className="rounded-xl">
            {data?.map((item, index) => (
              <CarouselItem
                key={index}
                className="relative h-[300px] w-full rounded-xl"
              >
                {" "}
                {/* Adjust the height ratio as needed */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${item.imageId}`}
                  alt="c-1"
                  fill
                  className="object-fit"
                  unoptimized
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default HeroCarousel;
