"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatNumber } from "@/lib/utils";
import { useProductsStore } from "@/stores/useProductStore";

const imageArr = [
  "https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=ATV320_RP19026B&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=63441_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
  "https://download.schneider-electric.com/files?p_Doc_Ref=2253_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
];
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
  const { products, isLoading, error, fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      keyBoardControl={true}
      showDots={false}
      arrows={false}
      autoPlay
      autoPlaySpeed={1000}
      infinite
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      responsive={responsive}
      centerMode
      className="mb-16 p-1 shadow-lg rounded-xl border"
    >
      {products.slice(0, 10).map((product, index) => (
        <Card className="border-none" key={index}>
          <CardContent className="relative">
            <div className="flex justify-center gap-2 items-center">
              <Image
                src={product.image}
                height={200}
                width={150}
                alt="best-1"
                className="object-fill"
              />
              <div>
                <Badge variant="destructive">Best Choice</Badge>
                <p className="font-bold text-xs line-clamp-2 overflow-hidden my-1">
                  {product.title}
                </p>
                <p className="font-semibold text-muted-foreground text-sm">
                  {product.currency}
                  {formatNumber(product.currentPrice)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
};

export default ProductCarousal;
