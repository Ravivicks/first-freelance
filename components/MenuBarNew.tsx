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
import { useParams, useRouter } from "next/navigation";
import { useProductsStore } from "@/stores/useProductStore";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl";

const MenuBarNew = () => {
  const { locale } = useParams();
  const router = useRouter();
  const { onOpen } = useCommonEnquiry();
  const { brands, categories, fetchData } = useProductsStore();

  const t = useTranslations("menuBar");
  const aboutSubmenu = t.raw("aboutSubmenu"); // Dynamically pulling submenu from translations

  // Handlers for routing
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
            {/* Best Seller */}
            <MenubarMenu>
              <MenubarTrigger>{t("firstMenuTitle")}</MenubarTrigger>
            </MenubarMenu>

            {/* Shop By Category */}
            <MenubarMenu>
              <MenubarTrigger>
                {t("secondMenuTitle")}
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

            {/* Shop By Brand */}
            <MenubarMenu>
              <MenubarTrigger>
                {t("thirdMenuTitle")}
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

            {/* About Company */}
            <MenubarMenu>
              <MenubarTrigger>
                {t("fourthMenuTitle")}
                <LucideChevronDown size={15} className="ml-2 mt-1" />
              </MenubarTrigger>
              <MenubarContent>
                {Array.isArray(aboutSubmenu) &&
                  aboutSubmenu.map((submenu: any, index: number) => (
                    <Link href={`/${locale}${submenu.url}`} key={index}>
                      <MenubarItem className="text-center p-2 hover:bg-gray-200">
                        {submenu.title}
                      </MenubarItem>
                    </Link>
                  ))}
              </MenubarContent>
            </MenubarMenu>
          </div>

          {/* Service Quote, Entire Project Quote, Why 100s of customers trust us */}
          <div className="flex">
            <MenubarMenu>
              <MenubarTrigger onClick={() => onOpen("serviceQuote")}>
                {t("fifthMenuTitle")}
              </MenubarTrigger>
              <MenubarTrigger onClick={() => onOpen("entireProjectQuote")}>
                {t("sixthMenuTitle")}
              </MenubarTrigger>
              <MenubarTrigger>
                <Link href="/who-we-are">{t("seventhMenuTitle")}</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </div>
        </div>
      </Menubar>
    </div>
  );
};

export default MenuBarNew;
