import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const partnerList = [
  {
    title: "Siemens",
    image: "/featured/partner/siemens.png",
  },
  {
    title: "Schneider",
    image: "/featured/partner/schneider.jpg",
  },
  {
    title: "Siemens",
    image: "/featured/partner/siemens.png",
  },
  {
    title: "Schneider",
    image: "/featured/partner/schneider.jpg",
  },
];

const FeaturedPartner = () => {
  return (
    <Card className="mb-16">
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-green-200 py-4 px-4">
        Featured Partners
      </h1>
      <div className=" flex gap-3 flex-wrap p-3">
        {partnerList.map((item, index) => (
          <Card
            className="rounded-xl hover:shadow-lg w-1/6 flex-grow"
            key={index}
          >
            <CardContent className="flex flex-col items-center justify-center mt-3 ">
              <div>
                <Image
                  src={item.image}
                  alt="p-1"
                  width={300}
                  height={200}
                  className="object-fit"
                />
              </div>
              <div className="border-t-2 w-full mt-7">
                <h1 className="font-extrabold text-2xl text-center mt-3">
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
