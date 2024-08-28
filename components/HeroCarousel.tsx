import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const HeroCarousel = () => {
  return (
    <div className="relative w-full rounded-full">
      <Carousel className="relative rounded-xl">
        <CarouselContent className="rounded-xl">
          <CarouselItem className="relative h-[300px] w-full rounded-xl">
            {" "}
            {/* Adjust the height ratio as needed */}
            <Image
              src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/4d670afb-72cc-4602-889a-c0129fd225d3._CR0%2C0%2C1500%2C750_SX750_SY375_.jpg"
              alt="c-1"
              fill
              className="object-fit"
            />
          </CarouselItem>
          <CarouselItem className="relative h-[300px] w-full">
            <Image
              src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/ff6f1927-0439-4968-bb1f-4ba0f3888e4e._CR0%2C0%2C1500%2C750_SX750_SY375_.jpg"
              alt="c-2"
              fill
              className="object-fit"
            />
          </CarouselItem>
          <CarouselItem className="relative h-[300px] w-full">
            <Image
              src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/ff6f1927-0439-4968-bb1f-4ba0f3888e4e._CR0%2C0%2C1500%2C750_SX750_SY375_.jpg"
              alt="c-3"
              fill
              className="object-fit"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
