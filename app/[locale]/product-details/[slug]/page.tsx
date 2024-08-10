"use client";
import Image from "next/image";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { useGetProducts } from "@/features/products/use-get-products";

const ProductDetails = () => {
  const { data: products, isLoading } = useGetProducts();
  const { slug, locale } = useParams();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Breadcrumbs slug={slug?.toString()} />
      <div className="h-[250px] relative mb-10">
        <Image src="/images/b1.png" alt="banner" fill />
      </div>
      <div className="flex gap-3 flex-wrap">
        {products?.map((product) => (
          <Link href={`/${locale}/products/${product._id}`} key={product._id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
