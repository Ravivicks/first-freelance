"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useProductsStore } from "@/stores/useProductStore";
import { IProduct } from "@/types";

interface IProductNew {
  product: IProduct;
}

export function ProductNew({ product }: IProductNew) {
  const { products, fetchData } = useProductsStore();
  const key = "product-new";
  const router = useRouter();

  React.useEffect(() => {
    fetchData(key, 1, 20, { brand: product?.brand });
  }, [fetchData, key, product?.brand]);

  const productList = products[key] || [];

  const handleClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="mt-6 mr-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        orientation="single"
      >
        <CarouselContent>
          {productList.slice(0, 10).map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card className="flex flex-col items-center rounded-xl">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleClick(item._id)}
                  >
                    <CardContent className="flex items-center justify-center relative h-[200px] w-[200px] my-5">
                      <Image
                        src={item.image}
                        alt={`slide-${index}`}
                        fill
                        className="rounded-md"
                        unoptimized
                      />
                    </CardContent>
                  </div>
                  <CardFooter className="mt-3">
                    <p className="text-2xl self-center">{item.brand}</p>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
