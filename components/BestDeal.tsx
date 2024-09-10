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
  const key = "best-deal";

  useEffect(() => {
    fetchData(key, 1, 20, { brand: "Siemens" });
  }, [fetchData, key]);

  const productList = products[key] || [];

  return (
    <Card className="mb-16">
      <div className="flex justify-between w-full items-center bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4 mb-5">
        <h1 className="text-3xl font-bold">Top Selling Products</h1>
        <Button
          variant="destructive"
          className="sm:mt-0 hidden md:flex rounded-full"
        >
          View All <ChevronRight className="ml-1 size-5" />
        </Button>
        <Button variant="destructive" className="rounded-full md:hidden">
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <CardContent className="flex flex-col gap-4 mt-5">
        <div className="flex flex-wrap justify-center md:justify-start gap-3 px-3">
          {productList?.slice(0, 6).map((product) => (
            <FeaturedProductCard
              product={product}
              key={product._id}
              isBestDeal
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BestDeal;
