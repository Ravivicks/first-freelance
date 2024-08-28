import { menuItems } from "@/lib/data";
import React from "react";
import { Separator } from "./ui/separator";
import { FacebookIcon, Instagram, QrCodeIcon, Youtube } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-50 w-full py-4 flex items-center justify-center rounded-b-sm border">
        <div className="flex gap-2 items-center">
          <p className="font-semibold text-black">NewsLetter</p>
          <Input className="w-[300px]" placeholder="Enter your email" />
          <Button variant="destructive" className="text-center">
            Subscribe
          </Button>
        </div>
      </div>
      <div>
        <div className="flex justify-between flex-col md:flex-row my-6 mx-6">
          <div>
            <h1 className="text-lg font-bold mb-3 ">About Us</h1>
            <div className="text-sm">
              <p className="font-bold">Monday - Friday</p>
              <p className="text-muted-foreground">10:00 am to 7:00 pm</p>
              <p className="font-bold text-sm mt-2">Saturday</p>
              <p className="text-muted-foreground">10:00 am to 2:00 pm</p>
              <p className="text-muted-foreground">Sunday closed</p>
              <p className="font-bold text-sm mt-2">Company Holidays</p>
              <p className="text-muted-foreground">
                01,Apr 2024 until 05,Apr 2024{" "}
              </p>
              <p className="text-muted-foreground">
                02,Aug 2024 until 10,Aug 2024{" "}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold mb-3 ">Important Links</h1>
            <div className="flex flex-col gap-2">
              <p>Imprint</p>
              <p>Term and Conditions</p>
              <p>Contact</p>
              <p>Data Protection</p>
              <p>Cookie Configuration</p>
              <p>Warranty Information</p>
              <p>Siemens Mall</p>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold mb-3 ">Information</h1>
            <p className="mb-3">Shipping Information</p>
            <p className="mb-3">IBAN / BIC Calculator</p>
            <QrCodeIcon className="size-36" />
          </div>
          <div>
            <h1 className="text-lg font-bold mb-3 ">Payment Method</h1>
            <Image src="/pio.png" alt="pay" width={250} height={200} />
            <p className="my-3">Online Transfer</p>
            <p>RTGS / NEFT</p>
          </div>
          <div>
            <h1 className="text-lg font-bold mb-3 ">Shipping Method</h1>
            <Image src="/Versand_UPS.png" alt="pay" width={100} height={100} />
            <p className="mb-3">UPS Worldwide Express</p>
            <Image src="/Versand_DHL.png" alt="pay" width={100} height={100} />
            <p className="mb-3">DHL Express track</p>
            <Image src="/Versand_TNT.png" alt="pay" width={100} height={100} />
            <p>TNT Express track</p>
          </div>
          {/* {menuItems.map((item) => (
            <div key={item.title}>
              <h1 className="text-lg font-bold mb-3 ">{item.title}</h1>
              {item.subMenu.map((submenu) => (
                <p key={submenu.title}>
                  <Link
                    href={`${submenu.url}`}
                    className="text-muted-foreground my-1 text-md"
                  >
                    {submenu.title}
                  </Link>
                </p>
              ))}
            </div>
          ))} */}
        </div>
        <div className="p-3 bg-gray-50 rounded-t-sm border">
          <p className="text-xs">
            © 2024 PROSAFE AUTOMATION. All Rights Reserved. PROSAFE AUTOMATION
            is not an authorised distributor or representative of the
            manufacturers featured on this website. SIEMENS, SIMATIC ®, SITOP ®,
            SIMADYN ®, SINUMERIC ®, SIMOVERT® and others are registered
            trademarks of Siemens Aktiengesellschaft, Berlin and Munich. All
            trademarks owned by the respective companies. Subject to errors.
            Notice of liability: Despite careful control of the content, we
            accept no liability for the content of external links. The operators
            of the linked pages are solely responsible for their content.
          </p>
        </div>
        <div className="bg-black w-full py-3 flex justify-between px-3 text-white">
          <p className="text-sm">
            Our offer is aimed exclusively at commercial customers
          </p>
          <div className="flex gap-2 text-sm">
            <p>Imprint</p>
            <p>Term and Conditions</p>
            <p>Contact</p>
            <p>Data Protection</p>
            <p>Cookie Configuration</p>
            <p>Warranty Information</p>
            <p>Siemens Mall</p>
          </div>
        </div>
        {/* <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-3 ">Stay Connected...</h2>
          <div className="flex gap-3 my-2">
              <FacebookIcon className="text-blue-700" />
              <Instagram />
              <Youtube className="text-red-500" />
            </div>
          <div className="flex gap-2">
            <Input
              className="rounded-xl w-[300px]"
              placeholder="Enter your email"
            />
            <Button variant="destructive" className="rounded-xl text-center">
              Subscribe
            </Button>
          </div>
          <p className="text-sm">
            &copy; 2024 PROSAFE AUTOMATION. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
