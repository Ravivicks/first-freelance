import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();
  const t = useTranslations("cartSheet");

  return (
    <>
      {cart && cart.length > 0 ? (
        <div>
          {cart?.map((cartItem, index) => (
            <div key={index}>
              <div className="flex justify-between my-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={cartItem.image}
                    alt={t("itemAltText", { index })}
                    height={50}
                    width={50}
                    className="rounded-xl"
                    unoptimized
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs">{cartItem.title}</p>
                    {cartItem.lowestPrice !== 0 && (
                      <p className="font-semibold text-xs text-muted-foreground">
                        {cartItem.currency}
                        {cartItem.lowestPrice}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MinusIcon
                    className="size-5 bg-destructive p-0.5 text-white rounded-full cursor-pointer"
                    onClick={() => decreaseQuantity(cartItem._id)}
                  />
                  <span>{cartItem.quantity}</span>
                  <PlusIcon
                    className="size-5 bg-destructive p-0.5 text-white rounded-full cursor-pointer"
                    onClick={() => increaseQuantity(cartItem._id)}
                  />
                  <Trash2Icon
                    className="size-4 cursor-pointer hover:text-red-800 ml-4"
                    onClick={() => removeFromCart(cartItem)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <svg
            className="w-24 h-24 mb-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-label={t("icons.cartIconAlt")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <p className="text-xl mb-8 text-center">{t("emptyCartMessage")}</p>
          <Button asChild variant="destructive">
            <Link href="/">{t("continueShoppingButton")}</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Cart;
