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
  const isLongDescription = product.description.length > charLimit;

  const isInCart = cart?.some((item) => item?._id === product?._id);

  const onBuyNow = (product: IProduct) => {
    if (!isInCart) {
      addToCart(product);
    }

    cartOpen();
  };
  return (
    <div className="max-w-md">
      <div className="flex justify-between my-4">
        <Image
          src="/images/logo.svg"
          alt="company-logo"
          width={50}
          height={20}
        />
        <p className="text-muted-foreground text-sm">Product code</p>
      </div>
      <h1 className="text-2xl my-2">{product?.title}</h1>
      <div className=" my-2 flex gap-4 text-muted-foreground text-xs items-center justify-start">
        <StarRating size={4} rating={product?.stars || 0} />
        42 Reviews
      </div>
      <p className="font-bold">
        {product?.currency}
        <span className="font-bold text-2xl">{product?.currentPrice}</span>
      </p>
      <p className="font-semibold text-xs">
        M.R.P.:{" "}
        <span className="line-through">
          {product?.currency}
          {product?.originalPrice}
        </span>
        ({product?.discount} off)
      </p>
      <p className="text-xs font-semibold text-muted-foreground my-4">
        Get it by Friday 9 August.
      </p>
      <p className="text-sm font-semibold mb-2">Product Description</p>
      <p className="text-xs text-muted-foreground">
        {showMore || !isLongDescription
          ? product.description
          : `${product.description.slice(0, charLimit)}...`}
      </p>
      {isLongDescription && (
        <Button
          className="text-xs text-destructive"
          variant="link"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </Button>
      )}
      <div className="flex justify-between flex-col md:flex-row gap-2 my-10">
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
      {/* <Button
        variant="destructive"
        className="rounded-full"
        onClick={() => onBuyNow(product)}
      >
        Buy Now
      </Button> */}
    </div>
  );
};
export default SingleProductDetails;
