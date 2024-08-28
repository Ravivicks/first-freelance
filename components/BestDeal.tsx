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
        <div className="flex justify-between w-full items-center">
          <CardTitle className="text-2xl md:text-3xl">
            Top Selling Products
          </CardTitle>
          <Button
            variant="destructive"
            className="mt-3 sm:mt-0 hidden md:block"
          >
            View All <ChevronRight className="ml-1 size-5" />
          </Button>
          <Button variant="destructive" className="rounded-full md:hidden">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mt-5">
        <div className="flex flex-wrap justify-center md:justify-start gap-3 px-3">
          {products?.slice(0, 4).map((product) => (
            <FeaturedProductCard product={product} key={product._id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BestDeal;
