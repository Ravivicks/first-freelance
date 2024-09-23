"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Badge, LucideChevronDown, Menu, User2Icon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { useCartDetails } from "@/hooks/use-cart-details";
import { useSearchOpen } from "@/hooks/use-search-open";
import { useProductsStore } from "@/stores/useProductStore";
import { useRouter } from "next/navigation";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { onOpen } = useCartDetails();
  const { onOpen: onSearchOpen } = useSearchOpen();
  const { brands, categories } = useProductsStore();
  const { onOpen: enquiryOpen } = useCommonEnquiry();

  const t = useTranslations("menuBar");

  const handleClick = (url: string, category: string) => {
    router.push(`/product-details/${url}?type=all&category=${category}`);
    setIsOpen(false);
  };
  const handleBrandClick = (url: string, brand: string) => {
    router.push(`/product-details/${url}?type=all&brand=${brand}`);
    setIsOpen(false);
  };
  const aboutSubmenu = t.raw("aboutSubmenu");
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="size-8" />
      </SheetTrigger>

      <SheetContent className="bg-white overflow-y-auto">
        <div className="flex items-center gap-5 mt-3">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={28}
            height={28}
            className="object-contain md:hidden"
            onClick={() => {
              onSearchOpen();
              setIsOpen(false);
            }}
          />
          {user && (
            <div
              className="bg-black flex text-white gap-5 px-3 py-1 rounded-md"
              onClick={() => {
                router.push("/user-account");
                setIsOpen(false);
              }}
            >
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

          <div
            className="relative"
            onClick={() => {
              onOpen();

              setIsOpen(false);
            }}
          >
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
            <Link
              href={user ? "/" : "/sign-in"}
              onClick={() => setIsOpen(false)}
            >
              <User2Icon className="size-5" />
            </Link>
          )}
        </div>
        <nav className="flex flex-col gap-y-2 pt-6 overflow-y-auto">
          <p className="my-2 font-bold">
            {t ? t("firstMenuTitle") : "Best Seller"}
          </p>
          <Collapsible>
            <div>
              <CollapsibleTrigger className="flex justify-between w-full my-2 font-bold">
                {t ? t("secondMenuTitle") : "Shop by category"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="border-none my-6">
                  {categories.map((subMenu) => (
                    <CardContent key={subMenu.label}>
                      <p
                        onClick={() =>
                          handleClick(subMenu.label, subMenu.value)
                        }
                      >
                        {subMenu.label}
                      </p>
                    </CardContent>
                  ))}
                </Card>
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible>
            <div>
              <CollapsibleTrigger className="flex justify-between w-full my-2 font-bold">
                {t ? t("thirdMenuTitle") : "Shop by Brand"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="border-none my-6">
                  {brands.map((subMenu) => (
                    <CardContent key={subMenu.label}>
                      <p
                        onClick={() =>
                          handleBrandClick(subMenu.label, subMenu.value)
                        }
                      >
                        {subMenu.label}
                      </p>
                    </CardContent>
                  ))}
                </Card>
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible>
            <div>
              <CollapsibleTrigger className="flex justify-between w-full my-2 font-bold">
                {t ? t("fourthMenuTitle") : "About Company"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="border-none my-6">
                  {Array.isArray(aboutSubmenu) &&
                    aboutSubmenu.map((subMenu: any, index: number) => (
                      <CardContent key={index}>
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
          <p
            className="my-2 font-bold"
            onClick={() => {
              enquiryOpen("serviceQuote");
              setIsOpen(false);
            }}
          >
            {t ? t("fifthMenuTitle") : "Service Quote"}
          </p>
          <p
            className="my-2 font-bold"
            onClick={() => {
              enquiryOpen("entireProjectQuote");
              setIsOpen(false);
            }}
          >
            {t ? t("sixthMenuTitle") : "Entire Project Quote"}
          </p>
          <p className="my-2 font-bold">
            <Link href="/who-we-are" onClick={() => setIsOpen(false)}>
              {t ? t("seventhMenuTitle") : "Why 100s of customers trust us"}
            </Link>
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
