"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LucideChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useProductsStore } from "@/stores/useProductStore";
import { menuItems } from "@/lib/data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";

const MenuBarNew = () => {
  const { user } = useUser();
  const router = useRouter();
  const { onOpen } = useCommonEnquiry();
  const { brands, categories } = useProductsStore();
  const {
    data: staticData,
    isLoading: staticLoading,
    error: staticError,
  } = useStaticDataStore();

  const handleClick = (url: string, category: string) => {
    router.push(`/product-details/${url}?type=all&category=${category}`);
  };
  const handleBrandClick = (url: string, brand: string) => {
    router.push(`/product-details/${url}?type=all&brand=${brand}`);
  };

  return (
    <div>
      <Menubar>
        <div className="flex justify-between w-full">
          <div className="flex">
            <MenubarMenu>
              <MenubarTrigger>
                {staticData
                  ? staticData?.menuBar?.firstMenuTitle
                  : "Best Seller"}
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                {staticData
                  ? staticData?.menuBar?.secondMenuTitle
                  : "Shop by category"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </MenubarTrigger>
              <MenubarContent className="grid grid-cols-6 gap-1 p-2">
                {categories.map((subMenu, index) => (
                  <MenubarItem
                    key={index}
                    onClick={() => handleClick(subMenu.label, subMenu.value)}
                    className="text-center p-2 hover:bg-gray-200"
                  >
                    {subMenu.label}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                {staticData
                  ? staticData?.menuBar?.thirdMenuTitle
                  : "Shop by Brand"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </MenubarTrigger>
              <MenubarContent>
                {brands.map((brand, index) => (
                  <MenubarItem
                    key={index}
                    onClick={() => handleBrandClick(brand.label, brand.value)}
                    className="text-center p-2 hover:bg-gray-200"
                  >
                    {brand.label}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                {staticData
                  ? staticData?.menuBar?.fourthMenuTitle
                  : "About Company"}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </MenubarTrigger>
              <MenubarContent>
                {staticData &&
                  staticData?.menuBar?.aboutSubmenu?.map(
                    (submenu: any, index: number) => (
                      <Link href={submenu.url} key={index}>
                        <MenubarItem className="text-center p-2 hover:bg-gray-200">
                          {submenu.title}
                        </MenubarItem>
                      </Link>
                    )
                  )}
              </MenubarContent>
            </MenubarMenu>
          </div>
          <div className="flex">
            {/* Additional Menubar Items at the End */}
            <MenubarMenu>
              <MenubarTrigger onClick={() => onOpen("serviceQuote")}>
                {staticData
                  ? staticData?.menuBar?.fifthMenuTitle
                  : "Service Quote"}
              </MenubarTrigger>
              <MenubarTrigger onClick={() => onOpen("entireProjectQuote")}>
                {staticData
                  ? staticData?.menuBar?.sixthMenuTitle
                  : "Entire Project Quote"}
              </MenubarTrigger>
              <MenubarTrigger>
                <Link href="/who-we-are">
                  {staticData
                    ? staticData?.menuBar?.seventhMenuTitle
                    : "Why 100s of customers trust us"}
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          </div>
        </div>
      </Menubar>
    </div>
  );
};

export default MenuBarNew;
