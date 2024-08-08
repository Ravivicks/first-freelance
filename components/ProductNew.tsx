import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const imageArr = [
  "https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=ATV320_RP19026B&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=63441_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=2253_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
];

export function ProductNew() {
  return (
    <div className="my-16">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        orientation="single"
      >
        <CarouselContent>
          {imageArr.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center aspect-auto justify-center">
                    <Image
                      src={item}
                      alt={`slide-${index}`}
                      width={200}
                      height={100}
                      className="object-fill"
                    />
                  </CardContent>
                  <CardFooter className="mt-3">
                    <p className="text-2xl">
                      <span className="font-extrabold">Easy</span> Altivar 310
                    </p>
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
