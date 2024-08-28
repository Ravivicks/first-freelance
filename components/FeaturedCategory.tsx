import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const navItems = [
  {
    title: "PLC Modicon",
    image:
      "https://download.schneider-electric.com/files?p_Doc_Ref=PF142100&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
    url: "/offers",
  },
  {
    title: "Industries Automation",
    image:
      "https://m.media-amazon.com/images/I/215JOkQ411L._SY445_SX342_QL70_FMwebp_.jpg",
    url: "/offers",
  },
  {
    title: "Signaling Device",
    image: "https://m.media-amazon.com/images/I/51uCtjrs-kL._SX425_.jpg",
    url: "/offers",
  },
  {
    title: "Limit Switches & Sensors",
    image: "https://m.media-amazon.com/images/I/61xnp+K0RJL._SX522_.jpg",
    url: "/offers",
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
            <div className="relative mb-4 sm:mb-0">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                unoptimized
              />
            </div>
            <h1 className="text-xl font-bold text-center sm:w-1/2">
              {item.title}
            </h1>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default FeaturedCategory;
