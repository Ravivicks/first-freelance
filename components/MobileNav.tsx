"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Badge, LucideChevronDown, Menu, User2Icon } from "lucide-react";
import { menuItems } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { useCartDetails } from "@/hooks/use-cart-details";
import { useSearchOpen } from "@/hooks/use-search-open";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { onOpen } = useCartDetails();
  const { onOpen: onSearchOpen } = useSearchOpen();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {/* <Button
          variant="outline"
          size="sm"
          className="font-normal py-3 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-black/30 transition"
        > */}
        <Menu className="size-8" />
        {/* </Button> */}
      </SheetTrigger>

      <SheetContent className="bg-white">
        <div className="flex items-center gap-5 mt-3">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={28}
            height={28}
            className="object-contain md:hidden"
            onClick={onSearchOpen}
          />
          {user && (
            <div className="bg-black flex text-white gap-5 px-3 py-1 rounded-md">
              <div className="flex flex-col text-xs">
                <p className="font-extrabold text-[#98cfea]">My</p>
                <p className="font-semibold">orders</p>
              </div>
              <div className="flex flex-col text-xs">
                <p className="font-extrabold text-[#98cfea]">My</p>
                <p className="font-semibold">Account</p>
              </div>
            </div>
          )}

          <div className="relative" onClick={onOpen}>
            <Image
              src="/assets/icons/bag.svg"
              alt="cart"
              width={28}
              height={28}
              className="object-contain"
            />
            <Badge className="bg-destructive rounded-full absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              {cart?.length}
            </Badge>
          </div>

          {user ? (
            <div className="flex gap-2 items-center justify-center">
              <UserButton />
              <p className="capitalize hidden md:block">
                {user && `${user?.firstName} ${user?.lastName}`}
              </p>
              <p className="capitalize md:hidden">
                {user && `${user?.firstName}`}
              </p>
            </div>
          ) : (
            <Link href={user ? "/" : "/sign-in"}>
              <User2Icon className="size-5" />
            </Link>
          )}
        </div>
        <nav className="flex flex-col gap-y-2 pt-6 overflow-y-auto">
          <p className="my-2 font-bold">Home</p>
          <p className="font-bold">Must buy products</p>
          {menuItems.map((route) => (
            <Collapsible key={route.title}>
              <div>
                <CollapsibleTrigger className="flex justify-between w-full my-2 font-bold">
                  {route.title}
                  <LucideChevronDown size={15} className="ml-2 mt-1" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="border-none my-6">
                    {route.subMenu.map((subMenu) => (
                      <CardContent key={subMenu.title}>
                        <Link
                          href={subMenu.url}
                          onClick={() => setIsOpen(false)}
                        >
                          {subMenu.title}
                        </Link>
                      </CardContent>
                    ))}
                  </Card>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </nav>
        {/* <SheetFooter className="absolute z-1 top-[85%]"></SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
