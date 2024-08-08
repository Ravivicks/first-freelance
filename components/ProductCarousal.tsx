"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardContent, CardFooter } from "./ui/card";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductCarousal = () => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      keyBoardControl={true}
      showDots={false}
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      responsive={responsive}
      centerMode
      className="mb-16"
    >
      <Card className="p-4 w-fit my-4 shadow-md ">
        <CardContent className="relative h-[200px] w-[350px]">
          <Image
            src="https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png"
            fill
            alt="best-1"
            className="object-fit"
          />
        </CardContent>
        <CardFooter className="mt-3">
          <p className="text-2xl">
            <span className="font-extrabold">Easy</span> Altivar 310
          </p>
        </CardFooter>
      </Card>
      <Card className="p-4 w-fit my-4 shadow-md ">
        <CardContent className="relative h-[200px] w-[350px]">
          <Image
            src="https://download.schneider-electric.com/files?p_Doc_Ref=ATV320_RP19026B&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png"
            fill
            alt="best-1"
            className="object-fit"
          />
        </CardContent>
        <CardFooter className="mt-3">
          <p className="text-2xl">
            <span className="font-extrabold">Altivar</span> Machine ATV320
          </p>
        </CardFooter>
      </Card>
      <Card className="p-4 w-fit my-4 shadow-md ">
        <CardContent className="relative h-[200px] w-[350px]">
          <Image
            src="https://download.schneider-electric.com/files?p_Doc_Ref=63441_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png"
            fill
            alt="best-1"
            className="object-fit"
          />
        </CardContent>
        <CardFooter className="mt-3">
          <p className="text-2xl">
            <span className="font-extrabold">Easy</span> Altivar 310
          </p>
        </CardFooter>
      </Card>
      <Card className="p-4 w-fit my-4 shadow-md ">
        <CardContent className="relative h-[200px] w-[350px]">
          <Image
            src="https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png"
            fill
            alt="best-1"
            className="object-fit"
          />
        </CardContent>
        <CardFooter className="mt-3">
          <p className="text-2xl">
            <span className="font-extrabold">Easy</span> Altivar 310
          </p>
        </CardFooter>
      </Card>
      <Card className="p-4 w-fit my-4 shadow-md ">
        <CardContent className="relative h-[200px] w-[350px]">
          <Image
            src="https://download.schneider-electric.com/files?p_Doc_Ref=2253_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png"
            fill
            alt="best-1"
            className="object-fit"
          />
        </CardContent>
        <CardFooter className="mt-3">
          <p className="text-2xl">
            <span className="font-extrabold">Easy</span> Altivar 310
          </p>
        </CardFooter>
      </Card>
    </Carousel>
  );
};

export default ProductCarousal;
