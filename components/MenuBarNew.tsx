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

const MenuBarNew = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    products,
    isLoading,
    error,
    fetchData,
    currentPage,
    setPage,
    totalPages,
    totalCount,
    brands,
    types,
    categories,
  } = useProductsStore();

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
              <MenubarTrigger>Best Seller</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                Shop by category{" "}
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
                Shop by Brand{" "}
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
                About Company{" "}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </MenubarTrigger>
              <MenubarContent>
                {menuItems[0].subMenu.map((item, index) => (
                  <Link href={item.url} key={index}>
                    <MenubarItem className="text-center p-2 hover:bg-gray-200">
                      {item.title}
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </div>
          <div className="flex">
            {/* Additional Menubar Items at the End */}
            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/">Service Quote</Link>
              </MenubarTrigger>
              <MenubarTrigger>Entire Project Quote</MenubarTrigger>
              <MenubarTrigger>Why 100s of customers trust us</MenubarTrigger>
            </MenubarMenu>
          </div>
        </div>
      </Menubar>
    </div>
  );
};

export default MenuBarNew;
