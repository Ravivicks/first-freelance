"use client";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { useCartStore } from "@/stores/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import { useCartDetails } from "@/hooks/use-cart-details";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl";

type Props = {
  product: IProduct;
  isBestDeal?: boolean;
};

const FeaturedProductCard = ({ product, isBestDeal }: Props) => {
  const { locale } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const { onOpen } = useCommonEnquiry();
  const { onOpen: cartOpen } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const router = useRouter(); // Use Next.js router for navigation

  const isInCart = cart?.some((item) => item._id === product._id);
  const t = useTranslations("bestDeal");

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      // Assuming mobile viewport width is less than 768px
      router.push(`/${locale}/products/${product._id}`); // Navigate to the product details page
    }
  };

  return (
    <Card
      className={cn(
        "group relative w-full sm:w-[45%] md:w-[30%] border rounded-xl p-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg flex-grow",
        isBestDeal ? "lg:w-[10%]" : "lg:w-[15%]"
      )}
      onClick={handleCardClick}
    >
      <CardContent className="w-full transition-opacity duration-300 group-hover:opacity-50">
        <div
          className={cn(
            "relative mb-3",
            isBestDeal ? "h-[130px]" : "h-[130px]"
          )}
        >
          <Image
            src={product?.image}
            alt={product?.title}
            fill
            className="object-contain p-3"
            unoptimized
            loading="eager"
          />
        </div>

        <div>
          <h1 className="text-sm font-semibold line-clamp-2 overflow-hidden">
            {product?.title}
          </h1>

          {product.lowestPrice !== 0 && (
            <p className="font-semibold mt-3">
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
      </CardContent>

      {/* Buttons that appear in the middle on hover */}
      {/* {product.lowestPrice !== 0 ? ( */}
      <div className=" absolute inset-0  items-center mx-5 hidden md:flex flex-col gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          className="rounded-full w-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevents click event from bubbling to the card
            isInCart ? cartOpen() : addToCart(product);
          }}
        >
          {isInCart ? t("buttonLabels.goToCart") : t("buttonLabels.addToCart")}
        </Button>
        {product.lowestPrice !== 0 ? (
          <Button
            variant="destructive"
            className="rounded-full w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling to the card
              onOpen("quoteRequest", product._id);
            }}
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

        <Link href={`/${locale}/products/${product._id}`} className="w-full">
          <Button variant="outline" className="w-full rounded-full">
            {t("buttonLabels.productDetails")}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default FeaturedProductCard;
