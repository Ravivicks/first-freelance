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
import SearchComponent from "./Search";
import { useSearchOpen } from "@/hooks/use-search-open";

const navIcons = [{ src: "/assets/icons/bag.svg", alt: "bag" }];

const Navbar = () => {
  const { user } = useUser();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { onOpen } = useCartDetails();
  const { onOpen: onSearchOpen } = useSearchOpen();

  return (
    <header className="w-full">
      <nav className=" pb-6 flex justify-between  items-center">
        {/* <div className="flex justify-between items-center"> */}
        <div>
          <Link href="/" className="flex gap-2">
            <div className="flex justify-center items-center">
              <Image src="/logo.svg" alt="logo" width={140} height={100} />
              <div>
                <p className="text-black font-black uppercase">
                  Automation Ecom
                </p>{" "}
                <p className="text-[#98cfea] uppercase font-extrabold">
                  Global
                </p>
              </div>
            </div>
          </Link>
          {/* <p className="pl-8 mb-5 text-xs font-semibold underline md:hidden">
              We Strive To Discipline Industry Spare Part Requirements.
            </p> */}
        </div>
        <div className="block sm:hidden">
          <MobileNav />
        </div>
        {/* </div> */}

        <div className="hidden w-[50%] md:block">
          <SearchComponent />
        </div>

        <div className="items-center gap-5 hidden md:flex">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={28}
            height={28}
            className="object-contain md:hidden"
            onClick={onSearchOpen}
          />
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
