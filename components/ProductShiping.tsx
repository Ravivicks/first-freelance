import { InfoIcon, Shield, Undo2, ZapIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductShiping = () => {
  return (
    <div className="text-sm -mt-6">
      <div className=" w-full bg-gray-100 rounded-xl p-3 flex flex-col gap-3">
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <Undo2 className="size-6" />
          </div>
          <p>
            <span className="font-bold">Breathe easy.</span> Free returns.
          </p>
        </div>
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-2">
            <ZapIcon className="size-6  " />
          </div>
          <p>
            <span className="font-bold">People want this.</span> 31 people are
            watching this.
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 my-5">
          <p className=" font-bold">Shipping:</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              US $1.00 Standard Shipping from Greater China to worldwide.
              <span className="underline ml-1">See details</span>
            </p>
            <p className="relative pr-6 font-semibold text-muted-foreground">
              International shipment of items may be subject to customs
              processing and additional charges.
              <InfoIcon className="size-4 absolute right-[4.8rem] top-[2.4rem] transform -translate-y-1/2" />
            </p>
            <p className="font-semibold text-muted-foreground">
              Located In: India, China
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <p className="font-bold">Delivery:</p>
          <div className="flex flex-col gap-3">
            <p className="relative pr-6 font-semibold ">
              Estimated between Mon, Sep 2 and Wed, Sep 25
              <InfoIcon className="size-4 absolute right-[3.8rem] top-[0.8rem] transform -translate-y-1/2" />
            </p>
            <p className=" font-semibold text-muted-foreground">
              Please note the delivery estimate is
              <span className="text-black">
                {" "}
                greater than 11 business days.
              </span>
            </p>
            <p className="font-semibold text-muted-foreground">
              Please allow additional time if international delivery is subject
              to customs processing.
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">Shipping:</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              30 days returns. Seller pays for return shipping.
              <span className="underline ml-1">See details</span>
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="font-bold">Payments:</p>
          <div className="flex flex-col gap-3">
            <Image
              src="/images/payment-mode.png"
              alt="paymet"
              width={400}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="border-t-2 border-b-2">
        <p className="py-3 font-bold text-lg">Shop with confidence</p>
        <div className="flex gap-2 mb-3">
          <Shield className="size-14" />
          <div>
            <p className="font-bold">Comapny Moneyback Guarantee</p>
            <p className="font-semibold text-muted-foreground">
              Get the item you ordered or your money back. Learn more
              <span className="underline ml-1">Learn more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShiping;
