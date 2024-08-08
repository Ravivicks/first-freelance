import Image from "next/image";
import React from "react";

const GridView = () => {
  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className=" w-full">
          <div className="relative h-full w-full">
            <Image src="/images/g2.png" alt="g-1" fill className="object-fit" />
          </div>
        </div>
        <div className=" w-full">
          <div className="relative h-[300px] w-full mb-2">
            <Image
              src="/images/g3.png"
              alt="g-1"
              fill
              className="object-fit "
            />
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/g4.png"
                alt="g-1"
                fill
                className="object-fit"
              />
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/g5.png"
                alt="g-1"
                fill
                className="object-fit"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 flex-col md:flex-row">
        <div className="relative h-[300px] w-full">
          <Image
            src="/images/g6.png"
            alt="g-1"
            fill
            className="object-fit hover:shadow-sm"
          />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/g1.png" alt="g-1" fill className="object-fit" />
        </div>
      </div>
    </div>
  );
};

export default GridView;
