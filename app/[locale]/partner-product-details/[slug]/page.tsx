"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import Loader from "@/components/Loader";
import NoProductFound from "@/components/NoProduct";
import { useGetBanners } from "@/features/banner/use-get-banners";

const PartnerProductDetails = () => {
  const { slug } = useParams();
  const decodedBrand = slug ? decodeURIComponent(slug as string) : undefined;

  const {
    products,
    isLoading, // For initial loading only
    fetchData,
    currentPage,
    setPage,
    totalPages,
  } = useProductsStore();

  const sentinelRef = useRef<HTMLDivElement>(null); // Ref for infinite scroll trigger
  const [isLoadingMore, setIsLoadingMore] = useState(false); // For loading more products
  const key = "details-product";

  useEffect(() => {
    // Fetch initial products when brand slug changes or on first render
    fetchData(key, 1, 20, { brand: decodedBrand });
    setPage(key, 1); // Reset page to 1 on slug change
  }, [slug]);

  // Fetching banner data based on brand
  const { data, isLoading: bannerLoading } = useGetBanners("partner-banner");
  const banners = data?.reduce((acc, item) => {
    if (item.company) {
      acc[item.company] = item.imageId;
    }
    return acc;
  }, {} as Record<string, string>);

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
        threshold: 0.1, // Adjust trigger sensitivity
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

  const productList = products[key] || [];

  return (
    <div>
      <Breadcrumbs slug={decodedBrand} />

      {/* Show Loader only during initial loading */}
      {isLoading && !isLoadingMore ? (
        <Loader />
      ) : (
        <>
          {/* Banner */}
          {bannerLoading ? (
            <Loader />
          ) : (
            <div className="h-[250px] relative mb-10">
              <Image
                src={
                  banners?.[decodedBrand as string]
                    ? `${process.env.NEXT_PUBLIC_APP_URL}/en/api/images/${
                        banners[decodedBrand as string]
                      }`
                    : "/images/b1.png"
                }
                alt="banner"
                fill
                unoptimized
              />
            </div>
          )}

          {/* Products */}
          <div className="flex gap-3 flex-wrap mb-16">
            {productList.length > 0 ? (
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

          {/* Sentinel for triggering infinite scroll */}
          <div ref={sentinelRef} style={{ height: "20px" }} />
          {isLoadingMore && (
            <div className="text-center font-semibold">
              Loading more products...
            </div>
          )}
          {/* No loading indicator for loadMore */}
        </>
      )}
    </div>
  );
};

export default PartnerProductDetails;
