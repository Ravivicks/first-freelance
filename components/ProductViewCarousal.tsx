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
        <Card className="rounded-xl border-none w-auto h-full">
          <CardContent className="flex items-center justify-center p-6">
            <Image
              src={image || ""}
              alt={`Single-image`}
              width={400}
              height={300}
              className="object-fill"
              unoptimized
            />
          </CardContent>
        </Card>
      )}
      <div className="flex flex-row-reverse gap-5">
        <Carousel
          setApi={setApi}
          className="w-full self-center"
          orientation="single"
        >
          <CarouselContent>
            {imageArr?.map((img, index) => (
              <CarouselItem key={index}>
                <div className="rounded-xl border-none bg-gray-100">
                  <div className="flex items-center justify-center relative">
                    <Image
                      src={img}
                      alt={`Slide ${index + 1}`}
                      width={350}
                      height={120}
                      className="object-fit"
                      unoptimized
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="py-2 flex items-center">
          <div className="flex flex-wrap flex-col justify-center">
            {displayedThumbnails?.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={100}
                height={100}
                unoptimized
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 mr-2 rounded cursor-pointer mx-3 my-1 border p-2 ${
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
                className="w-16 h-16 mr-2 rounded cursor-pointer mx-3 border p-2"
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
