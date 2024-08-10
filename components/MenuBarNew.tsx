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

const MenuBarNew = () => {
  const { locale } = useParams();
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(`/${locale}/${url}`);
  };

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/">Home</Link>
          </MenubarTrigger>
          <MenubarTrigger>Must buy products</MenubarTrigger>
        </MenubarMenu>
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
      </Menubar>
    </div>
  );
};

export default MenuBarNew;
