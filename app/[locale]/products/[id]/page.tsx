"use client";
import { ProductNew } from "@/components/ProductNew";
import { ProductViewCarousal } from "@/components/ProductViewCarousal";
import SingleProductDetails from "@/components/SingleProductDetails";
import { Button } from "@/components/ui/button";
import { useGetProduct } from "@/features/products/use-single-product";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetails from "@/components/ProductDetails";
import Reviews from "@/components/Reviews";
import { IProduct } from "@/types";
import ProductShiping from "@/components/ProductShiping";
import { useProductsStore } from "@/stores/useProductStore";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

const ProductDetailsById = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: product, isLoading } = useGetProduct(id.toString());
  const {
    products,
    isLoading: isProductLoading,
    fetchData,
  } = useProductsStore();

  useEffect(() => {
    fetchData(1, 20, { query: product?.brand });
  }, [fetchData, isLoading]);

  const handleGoBack = () => {
    router.back(); // This will take the user back to the previous page
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mx-4 md:mx-8 lg:mx-16">
      <Button
        variant="link"
        onClick={handleGoBack}
        className="font-semibold text-muted-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to result
      </Button>

      <div className="flex flex-col lg:flex-row gap-8 my-5">
        <ProductViewCarousal
          imageArr={product?.sliderImages || []}
          image={product?.image}
        />
        <SingleProductDetails product={product as IProduct} />
      </div>
      <div className="mt-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {isProductLoading ? (
          <Loader />
        ) : (
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl md:text-2xl font-bold">
                Similar Products
              </h1>
              <p className="text-sm text-gray-500 cursor-pointer">
                Feedback | See all
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {products?.slice(0, 3).map((product, index) => (
                <div
                  className="flex-none flex-grow w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  key={index}
                >
                  <ProductCard product={product} isButton />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full lg:w-1/2">
          <ProductShiping />
        </div>
      </div>
      <h1 className="text-xl md:text-2xl font-bold mt-10">
        Mostly Visited Products
      </h1>
      <ProductNew />
      <Tabs defaultValue="review" className="mt-10">
        <TabsList className="bg-inherit">
          <TabsTrigger value="product" className="text-lg md:text-xl font-bold">
            Product Details
          </TabsTrigger>
          <TabsTrigger value="review" className="text-lg md:text-xl font-bold">
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="discussion"
            className="text-lg md:text-xl font-bold"
          >
            Discussion
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="w-full">
          <ProductDetails product={product as IProduct} />
        </TabsContent>
        <TabsContent value="review">
          <Reviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailsById;
