"use client";
import React from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";

const navItems = [
  {
    title: "Siemens PLC",
    image: "/product-category/webp/1.webp",
    url: "/categorywise-product-details/Siemens PLC",
  },
  {
    title: "Siemens Drive",
    image: "/product-category/webp/2.webp",
    url: "/categorywise-product-details/Siemens Drive",
  },
  {
    title: "Siemens HMI",
    image: "/product-category/webp/3.webp",
    url: "/categorywise-product-details/Siemens HMI",
  },
  {
    title: "Siemens Power Supply",
    image: "/product-category/webp/4.webp",
    url: "/categorywise-product-details/Siemens Power Supply",
  },
  {
    title: "Diesel Gen. Controller",
    image: "/product-category/webp/5.webp",
    url: "/categorywise-product-details/ Diesel Gen. Controller",
  },
  {
    title: "Schneider Pro-Face Telemecanique",
    image: "/product-category/webp/6.webp",
    url: "/",
  },
  {
    title: "Certification and Performance Tests",
    image: "/product-category/webp/7.webp",
    url: "/",
  },
  {
    title: "Siemens Discontinued- Obsolete Products and more",
    image: "/product-category/webp/8.webp",
    url: "/",
  },
  {
    title: "Other Automation Products",
    image: "/product-category/webp/9.webp",
    url: "/",
  },
  // {
  //   title: "Automation Consultancy",
  //   image: "/product-category/10.png",
  //   url: "/offers",
  // },
];

const CircularNavbar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center my-5 rounded-md py-5 bg-gradient-to-r from-slate-100 to-destructive/10 shadow-sm border">
      {navItems.map((item: any, index: any) => (
        <HoverCard key={index}>
          <HoverCardTrigger
            onClick={() => router.push(item.url)}
            className="cursor-pointer"
          >
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
