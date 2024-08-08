import React from "react";
import { Button } from "./ui/button";

const SingleProductDetails = () => {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl my-2">
        Schneider Electric Plastic 2 Pole 25A, 30Ma Residual Current Circuit
        Breaker, Standard Size (White), Small (xID)
      </h1>
      <p className="font-bold my-2">4.2 Star</p>
      <p className="font-bold">
        $<span className="font-bold text-2xl">2800</span>
      </p>
      <p className="font-semibold text-xs">
        M.R.P.: <span className="line-through">$5.9</span>(63% off)
      </p>
      <p className="text-xs font-semibold text-muted-foreground my-4">
        Get it by Friday 9 August.
      </p>
      <p className="text-muted-foreground text-xs mb-5">
        Ships from and sold by Ascentrek Solutions.
      </p>
      <ul className="list-disc text-xs text-muted-foreground">
        <li>White Color Plastic body material</li>
        <li>
          Miniature Circuit Breaker protect against Short Circuit and Overloads
          and keeps your property safe. This product is compatible for lighting
          loads,Such as bulb, heater etc
        </li>
        <li>DIN Rail Mounted W 72mm x H 85mm x D 77.5mm</li>
        <li>
          Green Premium Product - Green PremiumTM label is Schneider Electric’s
          commitment to delivering products with best-in-class environmental
          performance. Green Premium promises compliance with the latest
          regulations, transparency on environmental impacts, as well as
          circular and low-CO2 products.
        </li>
      </ul>
      <div className="flex justify-between flex-col md:flex-row gap-10 my-10">
        <Button variant="outline" className="rounded-full w-full">
          Enquire Now
        </Button>
        <Button variant="destructive" className="rounded-full w-full">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default SingleProductDetails;
