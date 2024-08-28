"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import StarRating from "./StarRating";
import { IProduct } from "@/types";
import { useCartStore } from "@/stores/useCartStore";
import { useEnquiry } from "@/hooks/use-enquire-open";
import { useCartDetails } from "@/hooks/use-cart-details";
import useFromStore from "@/hooks/useFromStore";
import { formatNumber } from "@/lib/utils";

interface IProps {
  product: IProduct;
}

const SingleProductDetails = ({ product }: IProps) => {
  const [showMore, setShowMore] = React.useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { onOpen } = useEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);

  // Set a character limit for two lines (adjust this based on your design).
  const charLimit = 250;

  // Check if the description exceeds the character limit.
  const isLongDescription = product?.description?.length > charLimit;

  const isInCart = cart?.some((item) => item?._id === product?._id);

  const onBuyNow = (product: IProduct) => {
    if (!isInCart) {
      addToCart(product);
    }

    cartOpen();
  };

  return (
    <div className="p-4 md:p-6 max-w-full md:max-w-md mx-auto">
      <div className="flex justify-between items-start md:items-center my-4">
        <Image
          src="/images/logo.svg"
          alt="company-logo"
          width={50}
          height={20}
          className="flex-shrink-0"
        />
        <p className="text-muted-foreground text-xs md:text-sm">Product code</p>
      </div>
      <h1 className="text-xl md:text-2xl my-2">{product?.title}</h1>
      <div className="my-2 flex gap-2 md:gap-4 text-muted-foreground text-xs md:text-sm items-center">
        <StarRating size={4} rating={product?.stars || 0} />
        <span>42 Reviews</span>
      </div>
      <p className="font-bold text-xl md:text-2xl">
        {product?.currency}
        <span className="font-bold text-xl md:text-2xl">
          {formatNumber(product?.currentPrice)}
        </span>
      </p>
      <p className="font-semibold text-xs md:text-sm">
        M.R.P.:{" "}
        <span className="line-through">
          {product?.currency}
          {formatNumber(product?.originalPrice)}
        </span>{" "}
        ({product?.discount} off)
      </p>
      <p className="text-xs md:text-sm font-semibold text-muted-foreground my-4">
        Get it by Friday 9 August.
      </p>
      <p className="text-sm font-semibold mb-2">Product Description</p>
      <p className="text-xs md:text-sm text-muted-foreground">
        {showMore || !isLongDescription
          ? product?.description
          : `${product?.description?.slice(0, charLimit)}...`}
      </p>
      {isLongDescription && (
        <Button
          className="text-xs text-destructive mt-2"
          variant="link"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </Button>
      )}
      <div className="flex flex-col md:flex-row gap-2 my-6">
        <Button
          variant="destructive"
          className="rounded-full flex-grow"
          onClick={() => onBuyNow(product)}
        >
          Buy Now
        </Button>
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
    </div>
  );
};

export default SingleProductDetails;
