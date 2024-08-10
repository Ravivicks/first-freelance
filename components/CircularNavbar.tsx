import { PercentIcon } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const navItems = [
  { title: "Top Offers", image: "/nav/offer.png", url: "/offers" },
  {
    title: "Industries Automation",
    image: "/nav/automation.svg",
    url: "/offers",
  },
  { title: "Power Product", image: "/nav/power-plant.svg", url: "/offers" },
  { title: "Switches", image: "/nav/network-switch.svg", url: "/offers" },
  { title: "Features Deal", image: "/nav/feature.svg", url: "/offers" },
  { title: "Light Dimmer", image: "/nav/dimmer.svg", url: "/offers" },
  { title: "USB Charger", image: "/nav/usb-charger-wire.svg", url: "/offers" },
  { title: "Wiser", image: "/nav/wiser.svg", url: "/offers" },
  // { title: "Night Foot Lamp", image: "/nav/lamp.svg", url: "/offers" },
  //   { title: "Telephone Outlet", image: "/nav/offer.svg", url: "/offers" },
  //   { title: "Switches Bundle", image: "/nav/offer.svg", url: "/offers" },
];

const CircularNavbar = () => {
  return (
    <div className="flex justify-center gap-16 items-center my-5 rounded-xl py-5 bg-gradient-to-r from-slate-100 to-green-200 shadow-sm border">
      {navItems.map((item, index) => (
        <div key={index}>
          <div className="flex flex-col items-center gap-2 ">
            <div className="rounded-full border p-3 shadow-xl">
              <Image
                src={item.image}
                alt={`nav - ${index}`}
                width={60}
                height={50}
                className="text-green-500"
              />
            </div>
            <p className="font-bold ">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CircularNavbar;
