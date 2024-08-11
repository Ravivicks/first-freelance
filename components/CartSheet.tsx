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
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { Button } from "./ui/button";
import { DeleteIcon, Trash2Icon } from "lucide-react";

const CartSheet = () => {
  const { isOpen, onClose } = useCartDetails();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (cart.length as number),
      0
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription className="flex gap-2 bg-destructive/5 p-3 rounded-full font-semibold text-destructive mt-10">
            <Image
              src="/assets/icons/bag.svg"
              alt="bag"
              width={20}
              height={10}
            />{" "}
            You Have {cart?.length} Items in your cart!
          </SheetDescription>
        </SheetHeader>
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
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xs">{cartItem.title}</p>
                    <p className="font-semibold text-xs text-muted-foreground">
                      {cartItem.currency}
                      {cartItem.lowestPrice}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => removeFromCart(cartItem)}
                  className="rounded-full"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-16">
            <p className="text-black text-sm font-semibold">Subtotal</p>
            <p className="text-sm font-semibold text-muted-foreground">
              ${total.toFixed(2)}
            </p>
          </div>
          <Button variant="destructive" className="w-full rounded-full mt-10">
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
