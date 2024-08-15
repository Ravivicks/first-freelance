"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import { useGetBanner } from "@/features/products/use-get-banner";

const PartnerProductDetails = () => {
  const { slug } = useParams();

  const decodedBrand = slug ? decodeURIComponent(slug as string) : undefined;

  const { products, isLoading, error, fetchData, currentPage, setPage } =
    useProductsStore();

  useEffect(() => {
    fetchData(currentPage, 20, decodedBrand);
  }, [currentPage, slug]);

  const { data, isLoading: bannerLoading } = useGetBanner(
    decodedBrand as string
  );

  const loadMore = () => {
    setPage(currentPage + 1);
  };

  if (isLoading && bannerLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Breadcrumbs slug={decodedBrand} />
      <div className="h-[250px] relative mb-10">
        <Image src={data?.image || "/images/b1.png"} alt="banner" fill />
      </div>
      <div className="flex gap-3 flex-wrap mb-16">
        {products?.map((product, index) => (
          <div
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-grow"
            key={index}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerProductDetails;
