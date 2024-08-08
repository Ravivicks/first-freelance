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

const imageArr = [
  "https://m.media-amazon.com/images/I/411oqw+ekUL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
  "https://m.media-amazon.com/images/I/41ytv-cPWeL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
  "https://m.media-amazon.com/images/I/41IKv9Q4qWL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
  "https://m.media-amazon.com/images/I/41TCmS+ig7L._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
];

export default function SingleProductView() {
  return (
    <Carousel className="w-full max-w-md mr-[200px]" orientation="single">
      <CarouselContent>
        {imageArr.map((item, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className=" border-none">
                <CardContent className="flex aspect-square items-center justify-center relative">
                  <Image
                    src={item}
                    alt={`slide-${index}`}
                    width={200}
                    height={100}
                    className="object-fill"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
