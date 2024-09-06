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
import { DeleteIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";
import { useEnquiry } from "@/hooks/use-enquire-open";

const CartSheet = () => {
  const router = useRouter();
  const { isOpen, onClose } = useCartDetails();
  const { onOpen } = useEnquiry();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();
  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {cart && cart?.length > 0 && (
            <SheetDescription className="flex gap-2 bg-destructive/5 p-3 rounded-full font-semibold text-destructive mt-10">
              <Image
                src="/assets/icons/bag.svg"
                alt="bag"
                width={20}
                height={10}
              />{" "}
              You Have {cart?.length} Items in your cart!
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
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-xs">
                          {cartItem.title}
                        </p>
                        <p className="font-semibold text-xs text-muted-foreground">
                          {cartItem.currency}
                          {cartItem.lowestPrice}
                        </p>
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
              <div className="flex justify-between mt-16">
                <p className="text-black text-sm font-semibold">Subtotal</p>
                <p className="text-sm font-semibold text-muted-foreground">
                  ${total.toFixed(2)}
                </p>
              </div>
              <Button
                variant="destructive"
                className="w-full rounded-full mt-10"
                onClick={() => {
                  router.push("/checkout");
                  onClose();
                }}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full mt-2"
                onClick={() => {
                  onOpen("cart");
                  onClose();
                }}
              >
                Request For Quotation
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
