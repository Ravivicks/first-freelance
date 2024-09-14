"use client";
import React, { useEffect } from "react";
import { Card } from "./ui/card";
import FeaturedProductCard from "./FeaturedProductCard";
import { useProductsStore } from "@/stores/useProductStore";

const FeaturedProduct = () => {
  const { products, isLoading, error, fetchData } = useProductsStore();

  const key = "featured-product"; // Use the appropriate key

  useEffect(() => {
    fetchData(key, 1, 20, { brand: "Schneider Electric" });
  }, [fetchData, key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const productList = products[key] || [];
  return (
    <Card className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4">
        Featured Product
      </h1>
      <div className="flex gap-3 flex-wrap justify-center p-3">
        {productList.map((product) => (
          <FeaturedProductCard product={product} key={product._id} />
        ))}
      </div>
    </Card>
  );
};

export default FeaturedProduct;
