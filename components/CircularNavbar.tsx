import { PercentIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const navItems = [
  { title: "Siemens PLC", image: "/product-category/1.png", url: "/offers" },
  { title: "Siemens Drive", image: "/product-category/2.png", url: "/offers" },
  { title: "Siemens HMI", image: "/product-category/3.png", url: "/offers" },
  {
    title: "Siemens Power Supply",
    image: "/product-category/4.png",
    url: "/offers",
  },
  {
    title: "Diesel Gen. Controller",
    image: "/product-category/5.png",
    url: "/offers",
  },
  {
    title: "Schneider Pro-Face Telemecanique",
    image: "/product-category/6.png",
    url: "/offers",
  },
  {
    title: "Certification and Performance Tests",
    image: "/product-category/7.png",
    url: "/offers",
  },
  {
    title: "Siemens Discontinued- Obsolete Products and more",
    image: "/product-category/8.png",
    url: "/offers",
  },
  {
    title: "Other Automation Products",
    image: "/product-category/9.png",
    url: "/offers",
  },
  // {
  //   title: "Automation Consultancy",
  //   image: "/product-category/10.png",
  //   url: "/offers",
  // },
];

const CircularNavbar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center my-5 rounded-md py-5 bg-gradient-to-r from-slate-100 to-destructive/10 shadow-sm border">
      {navItems.map((item, index) => (
        <HoverCard key={index}>
          <HoverCardTrigger>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div className="bg-white p-2 rounded-md border-2 shadow-xl">
                <Image
                  src={item.image}
                  alt={`nav - ${index}`}
                  width={80}
                  height={60}
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-xs md:text-sm text-center truncate max-w-[80px] md:max-w-[120px]">
                {item.title}
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <Image
              src={item.image}
              alt={`nav - ${index}`}
              width={300}
              height={180}
              className="object-cover border p-3"
            />
            <p className="font-bold text-sm text-center bg-green-100 p-3 border">
              {item.title}
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default CircularNavbar;
