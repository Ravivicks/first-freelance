"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import MobileNav from "./MobileNav";
import { User2Icon } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { Badge } from "./ui/badge";
import { useCartDetails } from "@/hooks/use-cart-details";

const navIcons = [{ src: "/assets/icons/bag.svg", alt: "bag" }];

const Navbar = () => {
  const { user } = useUser();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { onOpen } = useCartDetails();

  return (
    <header className="w-full">
      <nav className=" py-6 flex justify-between items-center px-4">
        <div className="block sm:hidden">
          <MobileNav />
        </div>
        <div>
          <Link href="/" className="flex gap-2">
            <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
            <p>Logo</p>
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={20}
            height={20}
            className="-mr-7 z-0 hidden md:block"
          />
          <Input
            className="w-[700px] rounded-xl bg-gray-100 border-none pl-8 hidden md:block"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center gap-5">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={28}
            height={28}
            className="object-contain md:hidden"
          />
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
      </nav>
    </header>
  );
};

export default Navbar;
