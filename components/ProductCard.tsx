"use client";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import useFromStore from "@/hooks/useFromStore";
import { useCartDetails } from "@/hooks/use-cart-details";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl";

type Props = {
  product: IProduct;
  isButton?: boolean;
};

const ProductCard = ({ product, isButton }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { locale } = useParams();
  const { onOpen } = useCommonEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const t = useTranslations("productCard");

  const isInCart = cart?.some((item) => item._id === product._id);

  const onBuyNow = (product: IProduct) => {
    if (!isInCart) {
      addToCart(product);
    }

    cartOpen();
  };

  return (
    <div className="max-w-sm flex flex-col border rounded-xl p-5 h-full bg-white overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl relative">
      <Link href={`/${locale}/products/${product._id}`}>
        <div
          className={cn(
            "group relative mb-5  w-full",
            isButton ? "h-[150px]" : "h-[220px]"
          )}
        >
          <Image
            src={product?.image || "/images/no-product.jpg"}
            alt={product?.title || "Product image"}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden mb-2">
            {product?.title}
          </h1>
          <div className="my-2 flex gap-1 text-muted-foreground items-center">
            <p className="text-xs font-semibold">{product?.stars}</p>
            <StarRating size={4} rating={product?.stars || 0} />
          </div>
          {product.lowestPrice !== 0 && (
            <p className="font-semibold text-lg mb-2">
              {product?.currency}
              {formatNumber(product?.lowestPrice)}
            </p>
          )}
          {product.lowestPrice !== 0 && (
            <p className="text-xs text-muted-foreground font-semibold">
              M. R. P. :
              <span className="line-through">
                {`${product?.currency} ${formatNumber(product?.highestPrice)}`}
              </span>
              {product.lowestPrice !== 0 && product.discount}
            </p>
          )}
        </div>
      </Link>
      {/* {!isButton && ( */}
      <div className="flex gap-2 flex-wrap mt-3">
        <Button
          variant="outline"
          className="rounded-full flex-grow"
          onClick={isInCart ? cartOpen : () => addToCart(product)}
        >
          {isInCart ? t("buttonLabels.goToCart") : t("buttonLabels.addToCart")}
        </Button>
        {product?.lowestPrice !== 0 ? (
          <Button
            variant="destructive"
            className="rounded-full flex-grow"
            onClick={() => onOpen("quoteRequest", product._id)}
          >
            {t("buttonLabels.requestQuotation")}
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="rounded-full w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling to the card
              onOpen("priceRequest", product._id);
            }}
          >
            {t("buttonLabels.requestForPrice")}
          </Button>
        )}
        <Button
          variant="outline"
          className="rounded-full w-full"
          onClick={() => onBuyNow(product)}
        >
          {t("buttonLabels.buyNow")}
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default ProductCard;
