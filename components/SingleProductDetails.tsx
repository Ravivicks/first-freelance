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
  const addToCart = useCartStore((state) => state.addToCart);
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
        (63% off)
      </p>
      <p className="text-xs font-semibold text-muted-foreground my-4">
        Get it by Friday 9 August.
      </p>
      <p className="text-muted-foreground text-xs mb-5">
        Ships from and sold by Ascentrek Solutions.
      </p>
      <ul className="list-disc text-xs text-muted-foreground">
        <li>White Color Plastic body material</li>
        <li>
          Miniature Circuit Breaker protect against Short Circuit and Overloads
          and keeps your property safe. This product is compatible for lighting
          loads,Such as bulb, heater etc
        </li>
        <li>DIN Rail Mounted W 72mm x H 85mm x D 77.5mm</li>
        <li>
          Green Premium Product - Green PremiumTM label is Schneider Electric’s
          commitment to delivering products with best-in-class environmental
          performance. Green Premium promises compliance with the latest
          regulations, transparency on environmental impacts, as well as
          circular and low-CO2 products.
        </li>
      </ul>
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
