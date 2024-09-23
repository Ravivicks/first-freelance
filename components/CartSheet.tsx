"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useCartDetails } from "@/hooks/use-cart-details";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const CartSheet = () => {
  const router = useRouter();
  const { isOpen, onClose } = useCartDetails();
  const { onOpen } = useCommonEnquiry();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();
  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }
  const t = useTranslations("cart");

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>{t("yourCart")}</SheetTitle>
          {cart && cart?.length > 0 && (
            <SheetDescription className="flex gap-2 bg-destructive/5 p-3 rounded-full font-semibold text-destructive mt-10">
              <Image
                src="/assets/icons/bag.svg"
                alt="bag"
                width={20}
                height={10}
              />{" "}
              {t("youHave")} {cart?.length} {t("item")}
            </SheetDescription>
          )}
        </SheetHeader>
        {cart && cart?.length > 0 ? (
          <div>
            <div>
              {cart?.map((cartItem, index) => (
                <div key={index}>
                  <div className="flex justify-between my-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={cartItem.image}
                        alt={`item - ${index}`}
                        height={50}
                        width={50}
                        className="rounded-xl"
                        unoptimized
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-xs">
                          {cartItem.title}
                        </p>
                        {cartItem.lowestPrice !== 0 && (
                          <p className="font-semibold text-xs text-muted-foreground">
                            {cartItem.currency}
                            {cartItem.lowestPrice}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Button
                    variant="ghost"
                    onClick={() => decreaseQuantity(cartItem._id)}
                    className="rounded-full"
                  > */}
                      <MinusIcon
                        className="size-5 bg-destructive p-0.5 text-white rounded-full cursor-pointer"
                        onClick={() => decreaseQuantity(cartItem._id)}
                      />
                      {/* </Button> */}
                      <span>{cartItem.quantity}</span>
                      {/* <Button
                    variant="ghost"
                    onClick={() => increaseQuantity(cartItem._id)}
                    className="rounded-full"
                  > */}
                      <PlusIcon
                        className="size-5 bg-destructive p-0.5 text-white rounded-full cursor-pointer"
                        onClick={() => increaseQuantity(cartItem._id)}
                      />
                      {/* </Button> */}
                      {/* <Button
                    variant="outline"
                    onClick={() => removeFromCart(cartItem)}
                    className="rounded-full"
                  > */}
                      <Trash2Icon
                        className="size-4 cursor-pointer hover:text-red-800 ml-4"
                        onClick={() => removeFromCart(cartItem)}
                      />
                      {/* </Button> */}
                    </div>
                  </div>
                </div>
              ))}
              {total !== 0 && (
                <div className="flex justify-between mt-16">
                  <p className="text-black text-sm font-semibold">
                    {t("subtotal")}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    ${total.toFixed(2)}
                  </p>
                </div>
              )}
              {total !== 0 && (
                <Button
                  variant="destructive"
                  className="w-full rounded-full mt-10"
                  onClick={() => {
                    router.push("/checkout");
                    onClose();
                  }}
                >
                  {t("checkout")}
                </Button>
              )}
              <Button
                variant={total === 0 ? "destructive" : "outline"}
                className={cn(
                  "w-full rounded-full",
                  total === 0 ? "mt-10" : "mt-2"
                )}
                onClick={() => {
                  onOpen("cart", "cart");
                  onClose();
                }}
              >
                {t("requestForQuotation")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative top-24">
            <EmptyCart />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
