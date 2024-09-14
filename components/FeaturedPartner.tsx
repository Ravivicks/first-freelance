"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const partnerList = [
  {
    title: "Siemens",
    image: "/featured/partner/siemens.png",
  },
  {
    title: "Schneider Electric",
    image: "/featured/partner/schneider.jpg",
  },
  {
    title: "Prosafe Automation",
    image: "/featured/partner/Prosafe.svg",
  },
  {
    title: "Deif Group",
    image: "/featured/partner/deif.png",
  },
];

const FeaturedPartner = () => {
  const router = useRouter();

  return (
    <Card className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4">
        Featured Partners
      </h1>
      <div className="flex gap-3 flex-wrap justify-center p-3">
        {partnerList.map((item, index) => (
          <Card
            className="rounded-xl hover:shadow-lg w-full sm:w-5/12 md:w-1/4 lg:w-1/6 flex-grow cursor-pointer"
            key={index}
            onClick={() => {
              router.push(`/partner-product-details/${item.title}`);
            }}
          >
            <CardContent className="flex flex-col items-center justify-center mt-3">
              <div className="flex justify-center relative h-[50px] w-[200px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-fill"
                />
              </div>
              <div className="border-t-2 w-full mt-7">
                <h1 className="font-extrabold text-xl md:text-2xl text-center mt-3">
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

export default FeaturedPartner;
