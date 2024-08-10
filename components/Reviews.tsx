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
    <div className="m-10 flex justify-between">
      <div className="flex">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-start items-center">
            <p className="text-sm font-semibold">Shubham Kumar</p>
            <span className="text-muted-foreground text-xs font-semibold">
              {" "}
              Yesterday
            </span>
          </div>
          <StarRating size={4} rating={4.2} />
          <p className="text-sm font-bold">
            Excellent product and quility is very good
          </p>
          <div>
            <div className="flex gap-3">
              <p
                className="text-xs text-muted-foreground font-semibold cursor-pointer hover:font-black"
                onClick={replyToggle}
              >
                Reply
              </p>
              <div className="inline-flex text-sm ">
                <ThumbsUp className="size-4 mr-1 text-muted-foreground" />
                <span className="font-semibold">12</span>
              </div>
              <div className="inline-flex text-sm ">
                <ThumbsDown className="size-4 mr-1 text-muted-foreground" />
                <span className="font-semibold">0</span>
              </div>
            </div>
            {isReply && (
              <div className="flex my-6">
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 justify-start items-center">
                    <p className="text-sm font-semibold">Shubham Kumar</p>
                    <span className="text-muted-foreground text-xs">
                      {" "}
                      Yesterday
                    </span>
                  </div>
                  <p className="text-sm font-bold">
                    Excellent product and quility is very good
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex justify-between">
          <StarRating size={7} rating={4.8} />
          <p className="font-bold text-lg">4.8</p>
        </div>
        <Separator className="my-3 h-1" />
        <div className="my-7 flex flex-col gap-3">
          <div className="flex gap-6">
            <p className="font-semibold text-muted-foreground text-sm">5</p>
            <Progress value={100} className="bg-slate-100" />
            <p className="font-semibold text-sm">28</p>
          </div>
          <div className="flex gap-6">
            <p className="font-semibold text-muted-foreground text-sm">4</p>
            <Progress value={80} className="bg-slate-100" />
            <p className="font-semibold text-sm">50</p>
          </div>
          <div className="flex gap-6">
            <p className="font-semibold text-muted-foreground text-sm">3</p>
            <Progress value={60} className="bg-slate-100" />
            <p className="font-semibold text-sm">100</p>
          </div>
          <div className="flex gap-6">
            <p className="font-semibold text-muted-foreground text-sm">2</p>
            <Progress value={10} className="bg-slate-100" />
            <p className="font-semibold text-sm">1</p>
          </div>
          <div className="flex gap-6">
            <p className="font-semibold text-muted-foreground text-sm">1</p>
            <Progress value={0} className="bg-slate-100" />
            <p className="font-semibold text-sm">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
