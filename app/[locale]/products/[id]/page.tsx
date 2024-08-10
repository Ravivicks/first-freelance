"use client";
import { ProductNew } from "@/components/ProductNew";
import { ProductViewCarousal } from "@/components/ProductViewCarousal";
import SingleProductDetails from "@/components/SingleProductDetails";
import { Button } from "@/components/ui/button";
import { useGetProduct } from "@/features/products/use-single-product";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetails from "@/components/ProductDetails";
import Reviews from "@/components/Reviews";
import { IProduct } from "@/types";
import ProductShiping from "@/components/ProductShiping";
import { useGetProducts } from "@/features/products/use-get-products";
import ProductCard from "@/components/ProductCard";

const ProductDetailsById = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: product, isLoading } = useGetProduct(id.toString());
  const { data: products, isLoading: isProductLoading } = useGetProducts();

  const handleGoBack = () => {
    router.back(); // This will take the user back to the previous page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-16">
      <Button
        variant="link"
        onClick={handleGoBack}
        className="font-semibold text-muted-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to result
      </Button>

      <div className="flex justify-center gap-24  my-5">
        <ProductViewCarousal
          imageArr={product?.sliderImages || []}
          image={product?.image}
        />
        <SingleProductDetails product={product} />
      </div>
      <div className="mt-10 flex justify-between gap-10">
        <div className="min-w-max">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Similar Product</h1>
            <p>Feedback | See all</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            {products?.slice(0, 3).map((product) => (
              <div className="w-[266px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <ProductShiping />
        </div>
      </div>
      <h1 className="text-2xl font-bold">Mostly Visited Products</h1>
      <ProductNew />
      <Tabs defaultValue="product" className="mt-10">
        <TabsList className="bg-inherit">
          <TabsTrigger value="product" className="text-2xl font-bold">
            Product Details
          </TabsTrigger>
          <TabsTrigger value="review" className="text-2xl font-bold">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="discussion" className="text-2xl font-bold">
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
