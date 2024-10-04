"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import { useGetBanners } from "@/features/banner/use-get-banners";
import Loader from "@/components/Loader";
import NoProductFound from "@/components/NoProduct";

const CategoryProductDetails = () => {
  const { slug } = useParams();

  // Decoding the slug to get subcategory for filtering
  const decodedSubCategory = slug
    ? decodeURIComponent(slug as string)
    : undefined;

  // Store for managing products, pagination, and fetching logic
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

  // Key for storing filtered product data by subcategory
  const key = `category-details-${decodedSubCategory}`;

  // Fetch data when the subcategory changes or on initial render
  useEffect(() => {
    if (decodedSubCategory) {
      fetchData(key, 1, 20, { subCategory: decodedSubCategory }); // Fetching by subcategory
      setPage(key, 1); // Reset page to 1 for new subcategory
    }
  }, [slug]);

  // Infinite scroll - Load more products as user scrolls
  const loadMore = async () => {
    const current = currentPage[key] ?? 1;
    if (isLoadingMore || current >= totalPages) return;

    setIsLoadingMore(true);

    try {
      await fetchData(key, current + 1, 20, {
        subCategory: decodedSubCategory,
      }); // Load more based on subcategory
      setPage(key, current + 1);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isLoading) {
          loadMore(); // Trigger loading more products when sentinel is visible
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
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

  const productList = products[key] || []; // Getting products filtered by the subcategory

  return (
    <div>
      <Breadcrumbs slug={decodedSubCategory} />

      {/* Displaying the list of filtered products */}
      {isLoading ? (
        <Loader />
      ) : (
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
      )}

      {/* Sentinel Element for Infinite Scrolling */}
      <div ref={sentinelRef} style={{ height: "20px" }} />
      {isLoadingMore && (
        <div className="text-center font-semibold">
          Loading more products...
        </div>
      )}
    </div>
  );
};

export default CategoryProductDetails;
