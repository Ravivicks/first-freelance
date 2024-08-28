"use client";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { useCartStore } from "@/stores/useCartStore";
import { useEnquiry } from "@/hooks/use-enquire-open";
import useFromStore from "@/hooks/useFromStore";
import { useCartDetails } from "@/hooks/use-cart-details";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  product: IProduct;
};

const FeaturedProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { onOpen } = useEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const router = useRouter(); // Use Next.js router for navigation

  const isInCart = cart?.some((item) => item._id === product._id);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      // Assuming mobile viewport width is less than 768px
      router.push(`/products/${product._id}`); // Navigate to the product details page
    }
  };

  return (
    <Card
      className="group relative w-full sm:w-[45%] md:w-[30%] lg:w-[22%] border rounded-xl mb-10 p-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg flex-grow"
      onClick={handleCardClick}
    >
      <CardContent className="w-full transition-opacity duration-300 group-hover:opacity-50">
        <div className="relative mb-3 h-[220px]">
          <Image
            src={product?.image}
            alt={product?.title}
            fill
            className="object-fill p-3"
            unoptimized
          />
        </div>

        <div>
          <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden">
            {product?.title}
          </h1>
          <p className="font-semibold mt-3">
            {product?.currency}
            {formatNumber(product?.lowestPrice)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            M. R. P. :
            <span className="line-through">
              {product?.currency} {formatNumber(product?.highestPrice)}
            </span>{" "}
            (15% Off)
          </p>
        </div>
      </CardContent>

      {/* Buttons that appear in the middle on hover */}
      <div className=" absolute inset-0  items-center mx-5 hidden md:flex flex-col gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          className="rounded-full w-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevents click event from bubbling to the card
            isInCart ? cartOpen() : addToCart(product);
          }}
        >
          {isInCart ? "Go to cart" : "Add to cart"}
        </Button>
        <Button
          variant="destructive"
          className="rounded-full w-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevents click event from bubbling to the card
            onOpen(product._id);
          }}
        >
          Enquire Now
        </Button>
        <Link href={`/products/${product._id}`} className="w-full">
          <Button variant="outline" className="w-full rounded-full">
            Product Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default FeaturedProductCard;
