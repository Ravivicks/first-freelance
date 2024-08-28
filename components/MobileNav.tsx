"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { LucideChevronDown, Menu } from "lucide-react";
import { menuItems } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@clerk/nextjs";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {/* <Button
          variant="outline"
          size="sm"
          className="font-normal py-3 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-black/30 transition"
        > */}
        <Menu className="size-8" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="bg-white">
        <nav className="flex flex-col gap-y-2 pt-6">
          <p className="my-2 font-bold">Home</p>
          <p className="font-bold">Must buy products</p>
          {menuItems.map((route) => (
            <Collapsible key={route.title}>
              <div>
                <CollapsibleTrigger className="flex justify-between w-full my-2 font-bold">
                  {route.title}
                  <LucideChevronDown size={15} className="ml-2 mt-1" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="border-none my-6">
                    {route.subMenu.map((subMenu) => (
                      <CardContent key={subMenu.title}>
                        <p className="">{subMenu.title}</p>
                      </CardContent>
                    ))}
                  </Card>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
