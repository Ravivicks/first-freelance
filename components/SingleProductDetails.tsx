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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { usePriceRequest } from "@/hooks/use-price-request-open";

interface IProps {
  product: IProduct;
}

const SingleProductDetails = ({ product }: IProps) => {
  const [showMore, setShowMore] = React.useState(false);
  const [qty, setQty] = React.useState<string>(
    product?.minQuantity?.toString() || "1"
  );
  const [error, setError] = React.useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const { onOpen } = useEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { onOpen: priceOpen } = usePriceRequest();

  const charLimit = 250;
  const isLongDescription = product?.description?.length > charLimit;
  const isInCart = cart?.some((item) => item?._id === product?._id);

  const minQuantity = product?.minQuantity || 1;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      const numericQty = Number(value);

      // Check if the entered quantity is less than the minQuantity
      if (numericQty < minQuantity) {
        setError(`Minimum order quantity is ${minQuantity}`);
      } else {
        setError(null);
      }
      setQty(value);
    }
  };

  const onBuyNow = (product: IProduct) => {
    if (!isInCart) {
      addToCart(product);
    }
    cartOpen();
  };

  return (
    <div className=" w-full">
      <div className="flex justify-between items-start md:items-center mb-4">
        <Image
          src={
            product?.brand === "Siemens"
              ? "/featured/partner/siemens.png"
              : product?.brand === "Schneider Electric"
              ? "/featured/partner/download.png"
              : "/images/logo.svg"
          }
          alt="company-logo"
          width={100}
          height={20}
          className="flex-shrink-0"
        />
        <p className="text-muted-foreground font-semibold text-xs md:text-sm">
          {product?.machineCode}
        </p>
      </div>
      <h1 className="text-xl md:text-2xl my-2">{product?.title}</h1>
      <div className="my-2 flex gap-2 md:gap-4 text-muted-foreground text-xs md:text-sm items-center">
        <StarRating size={4} rating={product?.stars || 0} />
        <span>42 Reviews</span>
      </div>
      {product?.lowestPrice !== 0 ? (
        <p className="font-bold text-xl md:text-2xl">
          {product?.currency}
          <span className="font-bold text-xl md:text-2xl">
            {formatNumber(product?.lowestPrice)}
          </span>
        </p>
      ) : (
        <p className="font-bold text-xl md:text-2xl">Price Not Avaliable</p>
      )}

      {product?.lowestPrice !== 0 ? (
        <p className="font-semibold text-xs md:text-sm">
          M.R.P.:{" "}
          <span className="line-through">
            {product?.currency}
            {formatNumber(product?.originalPrice)}
          </span>
          {product?.discount !== "0" && `(${product?.discount} off)`}
        </p>
      ) : (
        <p className="font-semibold text-xs md:text-sm">NA</p>
      )}
      <div className="flex gap-5 items-center mt-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="quantity" className="font-semibold">
            QTY:{" "}
          </Label>
          <Input
            type="text"
            className="h-8 w-12"
            id="quantity"
            placeholder="Enter required quantity"
            defaultValue={product?.minQuantity?.toString() || "1"}
            onChange={handleQuantityChange}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        {product?.quantity && (
          <p className="text-muted-foreground text-sm">
            {product?.quantity} Available
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

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
          disabled={!!error} // Disable button if there's an error
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          className="rounded-full flex-grow"
          onClick={isInCart ? cartOpen : () => addToCart(product)}
          disabled={!!error} // Disable button if there's an error
        >
          {isInCart ? "Go to cart" : "Add to cart"}
        </Button>
        {product?.lowestPrice !== 0 ? (
          <Button
            variant="destructive"
            className="rounded-full flex-grow"
            onClick={() => onOpen(product._id)}
            disabled={!!error} // Disable button if there's an error
          >
            Request Quotation
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="rounded-full flex-grow"
            onClick={() => priceOpen(product._id)}
            disabled={!!error} // Disable button if there's an error
          >
            Request For Price
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleProductDetails;
