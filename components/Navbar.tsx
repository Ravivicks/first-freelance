"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import MobileNav from "./MobileNav";
import { useMountedState } from "react-use";
import { User2Icon } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navIcons = [
  { src: "/assets/icons/bag.svg", alt: "bag" },
  { src: "/assets/icons/black-heart.svg", alt: "heart" },
];

const Navbar = () => {
  const { user } = useUser();
  return (
    <header className="w-full">
      <nav className=" py-8 flex justify-between items-center">
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
            className="w-[700px] rounded-xl border-none bg-gray-200 pl-8 hidden md:block"
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
          {navIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
          {user ? (
            <div className="flex gap-2 items-center justify-center">
              <UserButton />
              <p className="capitalize">
                {user && `${user?.firstName} ${user?.lastName}`}
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
