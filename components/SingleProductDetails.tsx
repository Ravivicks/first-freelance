import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import StarRating from "./StarRating";
import { IProduct } from "@/types";

interface IProps {
  product?: IProduct;
}

const SingleProductDetails = ({ product }: IProps) => {
  return (
    <div className="max-w-lg">
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
      <div className="flex justify-between flex-col md:flex-row gap-10 my-10">
        <Button variant="outline" className="rounded-full w-full">
          Enquire Now
        </Button>
        <Button variant="destructive" className="rounded-full w-full">
          Buy Now
        </Button>
      </div>
    </div>
  );
};
export default SingleProductDetails;
