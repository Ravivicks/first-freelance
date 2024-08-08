import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const HotDeal = () => {
  return (
    <Card className="bg-green-200">
      <CardHeader>
        <CardTitle>Hottest Offer</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src="https://m.media-amazon.com/images/I/51SlvF4pTyL._SY300_SX300_QL70_FMwebp_.jpg"
          alt="hot"
          width={250}
          height={100}
        />
        <p className="font-bold my-3 text-2xl">
          Best from clearing sale you get upto 30% discount on it!
        </p>
      </CardContent>
    </Card>
  );
};

export default HotDeal;
