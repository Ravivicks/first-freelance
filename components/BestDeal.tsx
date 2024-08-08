import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const imageArr = [
  "https://m.media-amazon.com/images/I/51fcujFTvsL._SX385_.jpg",
  "https://m.media-amazon.com/images/I/91f4RIeIIgL._AC_UL320_.jpg",
  "https://m.media-amazon.com/images/I/51lYzaJPZBL._SX300_SY300_QL70_FMwebp_.jpg",
  "https://m.media-amazon.com/images/I/51SlvF4pTyL._SY300_SX300_QL70_FMwebp_.jpg",
  "https://m.media-amazon.com/images/I/51MVfRkZCsL._SX342_SY445_QL70_FMwebp_.jpg",
  "https://m.media-amazon.com/images/I/A1mKNbVlktL._AC_UL320_.jpg",
];

const BestDeal = () => {
  return (
    <Card>
      <CardHeader className="bg-gray-100">
        <div className="flex justify-between w-full">
          <CardTitle>Best Deal in PLC</CardTitle>
          <div className="bg-gray-500 rounded-full p-3 hover:bg-gray-200 cursor-pointer">
            <ChevronRight />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row w-full">
        {imageArr.map((item, index) => (
          <Card className="p-4 w-fit my-4 rounded-xl" key={index}>
            <CardContent className="relative h-[200px] w-[150px]">
              <Image
                src={item}
                fill
                alt={`plc-${index}`}
                className="object-fit"
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default BestDeal;
