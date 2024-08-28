"use client";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { formatNumber } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEnquiry } from "@/hooks/use-enquire-open";
import useFromStore from "@/hooks/useFromStore";
import { useCartDetails } from "@/hooks/use-cart-details";

type Props = {
  product: IProduct;
  isButton?: boolean;
};

const ProductCard = ({ product, isButton }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { locale } = useParams();
  const { onOpen } = useEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);

  const isInCart = cart?.some((item) => item._id === product._id);

  const onBuyNow = (product: IProduct) => {
    if (!isInCart) {
      addToCart(product);
    }

    cartOpen();
  };

  return (
    <div className="max-w-sm flex flex-col border rounded-xl p-5 h-full bg-white overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl relative">
      <div className="group relative mb-5 h-[220px] w-full">
        <Image
          src={product?.image || ""}
          alt={product?.title || "Product image"}
          fill
          className="object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-50"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="destructive"
            className="rounded-full"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </Button>
        </div>
      </div>
      <Link href={`/${locale}/products/${product._id}`}>
        <div className="flex flex-col flex-grow">
          <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden mb-2">
            {product?.title}
          </h1>
          <div className="my-2 flex gap-1 text-muted-foreground items-center">
            <p className="text-xs font-semibold">{product?.stars}</p>
            <StarRating size={4} rating={product?.stars || 0} />
          </div>
          <p className="font-semibold text-lg mb-2">
            {product?.currency}
            {formatNumber(product?.lowestPrice)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold mb-5">
            M. R. P. :
            <span className="line-through">
              {product?.currency} {formatNumber(product?.highestPrice)}
            </span>{" "}
            (15% Off)
          </p>
        </div>
      </Link>
      {!isButton && (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            className="rounded-full flex-grow"
            onClick={isInCart ? cartOpen : () => addToCart(product)}
          >
            {isInCart ? "Go to cart" : "Add to cart"}
          </Button>
          <Button
            variant="destructive"
            className="rounded-full flex-grow"
            onClick={() => onOpen(product._id)}
          >
            Enquire Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
