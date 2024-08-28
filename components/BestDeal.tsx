"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import FeaturedProductCard from "./FeaturedProductCard";
import { useProductsStore } from "@/stores/useProductStore";

const BestDeal = () => {
  const { products, isLoading, error, fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Card className="mb-16">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-destructive/10">
        <div className="flex justify-between w-full">
          <CardTitle className="text-3xl">Top Selling Products</CardTitle>
          <Button variant="destructive">
            View All <ChevronRight className="size-5 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row w-full mt-5">
        <div className=" flex gap-3 flex-wrap px-3">
          {products?.slice(0, 5).map((product) => (
            <FeaturedProductCard product={product} key={product._id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BestDeal;
