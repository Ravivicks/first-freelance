"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatNumber } from "@/lib/utils";
import { useProductsStore } from "@/stores/useProductStore";
import Link from "next/link";

const responsive = {
  superLargeDesktop: {
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

const ProductCarousel = () => {
  const { products, isLoading, fetchData } = useProductsStore();
  const key = "product-carousel"; // Use the appropriate key

  useEffect(() => {
    fetchData(key, 1, 20, { brand: "Telemecanique" });
  }, [fetchData, key]);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Access products array using the key
  const productList = products[key] || [];

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      keyBoardControl
      showDots={false}
      arrows={false}
      autoPlay
      autoPlaySpeed={3000}
      infinite
      slidesToSlide={1}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-20-px"
      responsive={responsive}
      centerMode
      className="mb-8 p-1 shadow-lg rounded-md border"
    >
      {productList.slice(0, 10).map((product) => (
        <Link href={`/products/${product._id}`} key={product._id}>
          <Card className="border-none hover:shadow-lg transition-shadow duration-300">
            <CardContent className="relative">
              <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
                <Image
                  src={product.image}
                  height={200}
                  width={150}
                  alt={`Image of ${product.title}`}
                  className="object-cover"
                  unoptimized
                />
                <div>
                  <Badge variant="destructive">Best Choice</Badge>
                  <p className="font-bold text-xs line-clamp-2 overflow-hidden my-1">
                    {product.title}
                  </p>
                  {product.lowestPrice !== 0 && (
                    <p className="font-semibold text-muted-foreground text-sm">
                      {product.currency}
                      {formatNumber(product.lowestPrice)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
