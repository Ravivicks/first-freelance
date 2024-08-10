import { InfoIcon, Undo2, ZapIcon } from "lucide-react";
import React from "react";

const ProductShiping = () => {
  return (
    <div>
      <div className=" w-full bg-gray-100 rounded-xl p-3 flex flex-col gap-6">
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-3">
            <Undo2 className="size-8" />
          </div>
          <p>
            <span className="font-bold">Breathe easy.</span> Free returns.
          </p>
        </div>
        <div className="flex gap-5 justify-start items-center">
          <div className="rounded-full bg-white p-3">
            <ZapIcon className="size-8  " />
          </div>
          <p>
            <span className="font-bold">People want this.</span> 31 people are
            watching this.
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 my-5">
          <p className="text-lg font-bold">Shipping:</p>
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
          <p className="text-lg font-bold">Delivery:</p>
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
          <p className="text-lg font-bold">Shipping:</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              30 days returns. Seller pays for return shipping.
              <span className="underline ml-1">See details</span>
            </p>
          </div>
        </div>
        <div className="flex gap-10 my-5">
          <p className="text-lg font-bold">Payments:</p>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">
              30 days returns. Seller pays for return shipping.
              <span className="underline ml-1">See details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShiping;
