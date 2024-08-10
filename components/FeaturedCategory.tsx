import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    image: "https://m.media-amazon.com/images/I/11X4Y2pwolL.jpg",
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
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-green-200 py-4 px-4">
        Featured Category
      </h1>
      <div className=" flex gap-3 flex-wrap p-3">
        {navItems.map((item, index) => (
          <Card className="rounded-xl hover:shadow-lg flex-grow" key={index}>
            <CardContent className="flex flex-row-reverse items-center justify-center">
              <Image
                src={item.image}
                alt="p-1"
                width={150}
                height={200}
                className="object-fit"
              />
              <div>
                <h1 className="font-extrabold text-2xl w-[150px] z-0">
                  {item.title}
                </h1>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default FeaturedCategory;
