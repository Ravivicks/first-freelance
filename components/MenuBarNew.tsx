"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { menuItems } from "@/lib/data";
import { LucideChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const MenuBarNew = () => {
  const { locale } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(`/${locale}/${url}`);
  };

  return (
    <div>
      <Menubar>
        <div className="flex justify-between w-full">
          <div className="flex">
            {menuItems.map((item) => (
              <MenubarMenu key={item.title}>
                <MenubarTrigger>
                  {item.title}
                  <LucideChevronDown size={15} className="ml-2 mt-1" />
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  {item.subMenu.map((subMenu) => (
                    <MenubarItem
                      key={subMenu.title}
                      onClick={() => handleClick(subMenu.url)}
                    >
                      {subMenu.title}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            ))}
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
