import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { formatNumber } from "@/lib/utils";

type Props = {
  product?: IProduct;
  isButton?: boolean;
};

const ProductCard = ({ product, isButton }: Props) => {
  return (
    <div className="flex flex-col border rounded-xl p-5 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="relative mb-5 h-[220px] w-full">
        <Image
          src={product?.image || ""}
          alt={product?.title || "Product image"}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden mb-2">
          {product?.title}
        </h1>
        <div className="my-2 flex gap-1 text-muted-foreground items-center">
          <p className="text-xs font-semibold">{product?.stars}</p>
          <StarRating size={3} rating={product?.stars || 0} />
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
        {!isButton && (
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full flex-grow">
              Enquire Now
            </Button>
            <Button variant="destructive" className="rounded-full flex-grow">
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
