import { menuItems } from "@/lib/data";
import React from "react";
import { Separator } from "./ui/separator";
import { FacebookIcon, Instagram, Youtube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-2 px-6 pb-10">
      <div>
        <div className="flex justify-between flex-col md:flex-row my-6">
          {menuItems.map((item) => (
            <div key={item.title}>
              <h1 className="text-lg font-bold mb-3 ">{item.title}</h1>
              {item.subMenu.map((submenu) => (
                <p key={submenu.title}>
                  <Link
                    href={`${submenu.url}`}
                    className="text-muted-foreground my-1 text-md"
                  >
                    {submenu.title}
                  </Link>
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {/* <h2 className="text-lg font-bold mb-3 ">Stay Connected...</h2> */}
          {/* <div className="flex gap-3 my-2">
              <FacebookIcon className="text-blue-700" />
              <Instagram />
              <Youtube className="text-red-500" />
            </div> */}
          <div className="flex gap-2">
            <Input
              className="rounded-xl w-[300px]"
              placeholder="Enter your email"
            />
            <Button variant="destructive" className="rounded-xl text-center">
              Subscribe
            </Button>
          </div>
          <p className="text-sm">
            &copy; 2024 PROSAFE AUTOMATION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
