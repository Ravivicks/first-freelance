"use client";
import React, { useEffect } from "react";
import { Card } from "./ui/card";
import FeaturedProductCard from "./FeaturedProductCard";
import { useProductsStore } from "@/stores/useProductStore";

const FeaturedProduct = () => {
  const { products, isLoading, error, fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Card className="mb-16">
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4">
        Featured Product
      </h1>
      <div className=" flex gap-3 flex-wrap px-3">
        {products?.map((product) => (
          <FeaturedProductCard product={product} key={product._id} />
        ))}
      </div>
    </Card>
  );
};

export default FeaturedProduct;
