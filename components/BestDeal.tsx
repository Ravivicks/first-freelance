"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import FeaturedProductCard from "./FeaturedProductCard";
import { useProductsStore } from "@/stores/useProductStore";
import { useParams, useRouter } from "next/navigation";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

const BestDeal = () => {
  const { locale } = useParams();
  const router = useRouter();
  const { products, isLoading, error, fetchData } = useProductsStore();
  const key = "best-deal";
  const {
    data: staticData,
    isLoading: staticLoading,
    error: staticError,
  } = useStaticDataStore();

  useEffect(() => {
    fetchData(key, 1, 20, { type: "top-selling" }, locale as string);
  }, [fetchData, key]);

  const productList = products[key] || [];

  return (
    <Card className="mb-8">
      <div className="flex justify-between w-full items-center bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4 mb-5">
        <h1 className="text-3xl font-bold">
          {staticData ? staticData?.bestDeal?.title : "Top Selling Products"}
        </h1>
        <Button
          variant="destructive"
          className="sm:mt-0 hidden md:flex rounded-full"
          onClick={() => {
            router.push(`/product-details/top-selling?type=top-selling`);
          }}
        >
          {staticData ? staticData?.bestDeal?.viewAllButtonText : "View All"}{" "}
          <ChevronRight className="ml-1 size-5" />
        </Button>
        <Button variant="destructive" className="rounded-full md:hidden">
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <CardContent className="flex flex-col gap-4 mt-5">
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
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
