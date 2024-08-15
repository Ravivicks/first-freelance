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
      <div className="flex justify-start relative w-[200px] h-[150px]">
        <Image
          src="/featured/best.jpg"
          alt="best"
          fill
          className="object-fit rotate-90"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center -mt-20 mb-16">
        {products && sliderImages.length > 1 ? (
          sliderImages.map((item, index) => (
            <Carousel
              className="w-full max-w-md mr-[200px]"
              orientation="single"
              key={index}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="">
                    <Card className=" border-none">
                      <CardContent className="flex aspect-square items-center justify-center relative">
                        <Image
                          src={item}
                          alt={`slide-${index}`}
                          width={400}
                          height={100}
                          className="object-fill"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ))
        ) : (
          <div className="w-full max-w-md mr-[200px]">
            <Card className=" border-none">
              <CardContent className="flex aspect-square items-center justify-center relative">
                <Image
                  src={products[0]?.image || ""}
                  alt={`slide-1`}
                  width={400}
                  height={100}
                  className="object-fill"
                />
              </CardContent>
            </Card>
          </div>
        )}
        <SingleProductDetails product={products?.[0] as IProduct} />
      </div>
    </>
  );
}
