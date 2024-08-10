"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useGetProducts } from "@/features/products/use-get-products";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "./ProductCard";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProduct = () => {
  const { data: products, isLoading } = useGetProducts();
  const { locale } = useParams();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Card className="mb-16">
      <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-slate-100 to-green-200 py-4 px-4">
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
