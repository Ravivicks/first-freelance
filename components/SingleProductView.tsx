"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import SingleProductDetails from "./SingleProductDetails";
import { IProduct } from "@/types";
import { useProductsStore } from "@/stores/useProductStore";

export default function SingleProductView() {
  const { products, isLoading, error, fetchData } = useProductsStore();

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sliderImages = products?.[0]?.sliderImages || [];

  return (
    <>
      {/* Adjusted container for the image with responsive sizing */}
      <div className="flex justify-start relative w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
        <Image
          src="/featured/best.jpg"
          alt="best"
          fill
          className="object-cover rotate-90"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start -mt-10 md:-mt-32  mb-16">
        {products && sliderImages.length > 1 ? (
          <Carousel
            className="w-full max-w-xs md:max-w-md md:mr-8"
            orientation="single"
          >
            <CarouselContent>
              {sliderImages.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none">
                    <CardContent className="flex aspect-square items-center justify-center relative">
                      <Image
                        src={item}
                        alt={`slide-${index}`}
                        width={400}
                        height={400}
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="max-w-xs md:max-w-md">
            <Card className="border-none">
              <CardContent className="flex aspect-square items-center justify-evenly relative">
                <Image
                  src={products[0]?.image || ""}
                  alt={`slide-1`}
                  width={400}
                  height={400}
                  className="object-cover md:ml-32"
                />
              </CardContent>
            </Card>
          </div>
        )}
        {/* Ensure the SingleProductDetails component is responsive */}
        <SingleProductDetails product={products?.[0] as IProduct} />
      </div>
    </>
  );
}
