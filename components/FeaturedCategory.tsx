import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "PLC",
    image: "/product-category/1.png",
    url: "/offers",
    company: "/featured/partner/siemens.png",
  },
  {
    title: "Drive",
    image: "/product-category/2.png",
    url: "/offers",
    company: "/featured/partner/siemens.png",
  },
  {
    title: "Generator Turbine Solar Hybrid Controller",
    image: "/product-category/5.png",
    url: "/offers",
    company: "/featured/partner/deif.png",
  },
  {
    title: "HMI",
    image: "/product-category/11.png",
    url: "/offers",
    company: "/featured/partner/proface.png",
  },
];

const FeaturedCategory = () => {
  return (
    <Card className="mb-16">
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4">
        Featured Category
      </h1>
      <div className="flex flex-wrap gap-3 p-3">
        {navItems.map((item, index) => (
          <a
            href={item.url}
            className="rounded-xl flex flex-col flex-grow sm:flex-row justify-evenly items-center w-full sm:w-1/2 lg:w-1/5 hover:shadow-lg border p-4 transition-shadow"
            key={index}
          >
            <div className="relative mb-4 sm:mb-0 w-[350px] h-[200px]">
              <Image src={item.image} alt={item.title} fill unoptimized />
            </div>
            <div className="flex flex-col items-center justify-between text-center gap-4 relative">
              <div
                className={cn(
                  "relative mb-4 sm:mb-0 w-[150px]",
                  item.title === "HMI" ||
                    item.title === "Generator Turbine Solar Hybrid Controller"
                    ? "h-[50px]"
                    : "h-[30px]"
                )}
              >
                <Image src={item.company} alt={item.title} fill unoptimized />
              </div>
              <h1 className="text-xl font-bold text-center sm:w-1/2">
                {item.title}
              </h1>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default FeaturedCategory;
