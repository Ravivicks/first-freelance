"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import { useGetBanner } from "@/features/products/use-get-banner";
import Loader from "@/components/Loader";
import { useGetBanners } from "@/features/banner/use-get-banners";
import NoProductFound from "@/components/NoProduct";

const PartnerProductDetails = () => {
  const { slug } = useParams();

  const decodedBrand = slug ? decodeURIComponent(slug as string) : undefined;

  const {
    products,
    isLoading,
    error,
    fetchData,
    currentPage,
    setPage,
    totalPages,
  } = useProductsStore();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const key = "details-product";

  useEffect(() => {
    // Fetch initial data only on slug change or first render
    fetchData(key, 1, 20, { brand: decodedBrand });
    setPage(key, 1); // Reset page to 1 when slug changes
  }, [slug]);

  const { data, isLoading: bannerLoading } = useGetBanners("partner-banner");
  const result = data?.reduce((acc, item) => {
    if (item.company) {
      // Ensure category is defined
      acc[item.company] = item.imageId;
    }
    return acc;
  }, {} as Record<string, string>);

  // const { data, isLoading: bannerLoading } = useGetBanner(
  //   decodedBrand as string
  // );

  const loadMore = async () => {
    const current = currentPage[key] ?? 1;
    if (isLoadingMore || current >= totalPages) return;

    setIsLoadingMore(true);

    try {
      await fetchData(key, current + 1, 20, { brand: decodedBrand });
      setPage(key, current + 1);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1, // Adjusted to trigger earlier
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoadingMore]);

  const productList = products[key] || [];

  return (
    <div>
      <Breadcrumbs slug={decodedBrand} />
      {bannerLoading ? (
        <Loader />
      ) : (
        <div className="h-[250px] relative mb-10">
          <Image
            src={
              result?.[decodedBrand as string] !== undefined
                ? `${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${
                    result?.[decodedBrand as string]
                  }`
                : "/images/b1.png"
            }
            alt="banner"
            fill
            unoptimized
          />
        </div>
      )}
      <div className="flex gap-3 flex-wrap mb-16">
        {productList?.length > 0 ? (
          productList.map((product, index) => (
            <div
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex-grow"
              key={index}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <NoProductFound
            type="product"
            returnLink="/"
            returnLinkText="Back To Homepage"
          />
        )}
      </div>
      {/* Sentinel Element */}
      <div ref={sentinelRef} style={{ height: "20px" }} />
      {isLoadingMore && (
        <div className="text-center font-semibold">
          Loading more products...
        </div>
      )}
    </div>
  );
};

export default PartnerProductDetails;
