"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import { useGetBanner } from "@/features/products/use-get-banner";

const ProductDetails = () => {
  const { slug } = useParams();
  const decodedBrand = slug ? decodeURIComponent(slug as string) : undefined;
  const { products, isLoading, error, fetchData, currentPage, setPage } =
    useProductsStore();
  const { data: bannerData, isLoading: bannerLoading } = useGetBanner(
    decodedBrand as string
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Fetch initial data if page or slug changes
    fetchData(currentPage, 20);
  }, [currentPage, slug]);

  const loadMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      await fetchData(currentPage + 1, 20);
      setPage(currentPage + 1);
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
  }, [isLoadingMore, isLoading]);

  // Determine overall loading state
  // const isOverallLoading = isLoading && bannerLoading;

  // if (isOverallLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading products...</div>;
  // }

  return (
    <div>
      <Breadcrumbs slug={slug?.toString()} />
      <div className="h-[250px] relative mb-10">
        <Image src={bannerData?.image || "/images/b1.png"} alt="banner" fill />
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
      {/* Sentinel Element */}
      <div ref={sentinelRef} style={{ height: "20px" }} />
      {isLoadingMore && <div>Loading more products...</div>}
    </div>
  );
};

export default ProductDetails;
