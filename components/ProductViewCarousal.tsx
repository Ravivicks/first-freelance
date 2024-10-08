"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface IProps {
  imageArr: string[];
  image?: string;
}

export function ProductViewCarousal({ imageArr, image }: IProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Handle the click to expand or collapse the thumbnails
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the thumbnails to display
  const displayedThumbnails = isExpanded ? imageArr : imageArr?.slice(0, 4);

  return (
    <>
      {imageArr?.length < 1 && (
        <div className="rounded-xl border-none bg-destructive/5 px-4">
          <div className="flex items-center justify-center">
            <Image
              src={image || ""}
              alt={`Single-image`}
              width={400}
              height={200}
              className="object-fit"
              unoptimized
            />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row-reverse gap-4 justify-center items-center">
        <div className="w-full">
          <Carousel setApi={setApi} className="w-full" orientation="single">
            <CarouselContent>
              {imageArr?.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="rounded-xl border-none bg-destructive/5">
                    <div className="flex items-center justify-center relative">
                      <Image
                        src={img}
                        alt={`Slide ${index + 1}`}
                        width={300}
                        height={200}
                        className="object-fit"
                        unoptimized
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="w-full lg:w-1/6 flex flex-col items-center lg:items-start">
          <div className="flex flex-row lg:flex-col flex-wrap justify-center lg:justify-start gap-2">
            {displayedThumbnails?.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={100}
                height={100}
                unoptimized
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded cursor-pointer border p-1 ${
                  current === index + 1 ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => {
                  if (api) {
                    api.scrollTo(index);
                    setCurrent(index + 1);
                  }
                }}
              />
            ))}
            {imageArr?.length > 4 && !isExpanded ? (
              <button
                onClick={handleToggleExpand}
                className="w-20 h-20 rounded border p-1 flex items-center justify-center"
              >
                {`+${imageArr?.length - 4} More`}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
