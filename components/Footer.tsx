import { menuItems } from "@/lib/data";
import React from "react";
import { Separator } from "./ui/separator";
import { FacebookIcon, Instagram, Youtube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="border-t-2 px-6 pb-10">
      <div>
        <div className="flex justify-between flex-col md:flex-row my-6">
          {menuItems.map((item) => (
            <div key={item.title}>
              <h1 className="text-lg font-bold mb-3 ">{item.title}</h1>
              {item.subMenu.map((submenu) => (
                <p
                  key={submenu.title}
                  className="text-muted-foreground my-1 text-md"
                >
                  {submenu.title}
                </p>
              ))}
            </div>
          ))}
          <div>
            <h2 className="text-lg font-bold mb-3 ">Stay Connected...</h2>
            <div className="flex gap-3 my-2">
              <FacebookIcon className="text-blue-700" />
              <Instagram />
              <Youtube className="text-red-500" />
            </div>
            <div className="my-4 flex flex-col gap-2">
              <label
                className="font-semibold text-muted-foreground"
                htmlFor="newsletter"
              >
                Subscribe our news letter
              </label>
              <Input
                className="rounded-xl w-[300px]"
                placeholder="Enter your email"
              />
              <Button
                variant="destructive"
                className="rounded-full w-1/2 text-center mt-3"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
