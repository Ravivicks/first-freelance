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

const MenuBarNew = () => {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="font-semibold">Home</MenubarTrigger>
          <MenubarTrigger className="font-semibold">
            Must buy products
          </MenubarTrigger>
        </MenubarMenu>
        {menuItems.map((item) => (
          <MenubarMenu key={item.title}>
            <MenubarTrigger className="font-semibold">
              {item.title}
              <LucideChevronDown size={15} className="ml-2 mt-1" />
            </MenubarTrigger>
            <MenubarContent className="bg-white">
              {item.subMenu.map((subMenu) => (
                <MenubarItem key={subMenu.title}>{subMenu.title}</MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};

export default MenuBarNew;
