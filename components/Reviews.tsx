"use client";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import StarRating from "./StarRating";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

const Reviews = () => {
  const [isReply, setIsReply] = React.useState(false);
  const replyToggle = () => {
    setIsReply((prev) => !prev);
  };

  return (
    <div className="p-4 md:p-6 lg:flex lg:justify-between lg:items-start">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6 w-full">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 md:gap-4 items-center">
              <p className="text-sm md:text-base font-semibold">
                Shubham Kumar
              </p>
              <span className="text-muted-foreground text-xs md:text-sm font-semibold">
                {" "}
                Yesterday
              </span>
            </div>
            <StarRating size={4} rating={4.2} />
            <p className="text-sm font-bold">
              Excellent product and quality is very good
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <p
                  className="text-xs md:text-sm text-muted-foreground font-semibold cursor-pointer hover:font-black"
                  onClick={replyToggle}
                >
                  Reply
                </p>
                <div className="inline-flex text-sm items-center">
                  <ThumbsUp className="size-4 mr-1 text-muted-foreground" />
                  <span className="font-semibold">12</span>
                </div>
                <div className="inline-flex text-sm items-center">
                  <ThumbsDown className="size-4 mr-1 text-muted-foreground" />
                  <span className="font-semibold">0</span>
                </div>
              </div>
              {isReply && (
                <div className="flex mt-4 md:mt-6 gap-4">
                  <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 md:gap-4 items-center">
                      <p className="text-sm md:text-base font-semibold">
                        Shubham Kumar
                      </p>
                      <span className="text-muted-foreground text-xs md:text-sm">
                        {" "}
                        Yesterday
                      </span>
                    </div>
                    <p className="text-sm font-bold">
                      Excellent product and quality is very good
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="flex justify-between items-center">
            <StarRating size={7} rating={4.8} />
            <p className="font-bold text-lg md:text-xl">4.8</p>
          </div>
          <Separator className="my-3 h-1" />
          <div className="my-4 md:my-6 flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-muted-foreground text-sm">5</p>
              <Progress value={100} className="bg-slate-100" />
              <p className="font-semibold text-sm">28</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-muted-foreground text-sm">4</p>
              <Progress value={80} className="bg-slate-100" />
              <p className="font-semibold text-sm">50</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-muted-foreground text-sm">3</p>
              <Progress value={60} className="bg-slate-100" />
              <p className="font-semibold text-sm">100</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-muted-foreground text-sm">2</p>
              <Progress value={10} className="bg-slate-100" />
              <p className="font-semibold text-sm">1</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-muted-foreground text-sm">1</p>
              <Progress value={0} className="bg-slate-100" />
              <p className="font-semibold text-sm">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
