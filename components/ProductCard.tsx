import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { formatNumber } from "@/lib/utils";

type Props = {
  product?: IProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div>
      <div className="max-w-[300px] border rounded-xl mb-10 p-5 ">
        <div className="relative mb-5 h-[220px] w-full">
          <Image
            src={product?.image || ""}
            alt="p-1"
            fill
            className="object-fit p-5"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden">
            {product?.title}
          </h1>
          <div className=" my-2 flex gap-1 text-muted-foreground items-center justify-start">
            <p className="text-xs font-semibold">{product?.stars}</p>
            <StarRating size={3} rating={product?.stars || 0} />
          </div>
          <p className="font-semibold">
            {product?.currency}
            {formatNumber(product?.lowestPrice)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold mb-5">
            M. R. P. :
            <span className="line-through">
              {product?.currency} {formatNumber(product?.highestPrice)}
            </span>{" "}
            (15% Off){" "}
          </p>
          <div className="flex justify-between gap-2">
            <Button variant="outline" className="rounded-full w-full">
              Enquire Now
            </Button>
            <Button variant="destructive" className="rounded-full w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
