import { useGetEmail } from "@/features/email/use-get-email";
import { useGetProducts } from "@/features/products/use-get-products";
import { useTranslations } from "next-intl";
import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const Home = () => {
  const t = useTranslations("PhotoViewer");
  const { refetch, isLoading, isError, data, error } = useGetEmail();
  const { data: products, isLoading: productLoading } = useGetProducts();

  const handleSendEmail = () => {
    refetch();
  };

  if (productLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <Button onClick={handleSendEmail}>Send email</Button>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <ProductCard products={products} />
      {/* {products?.map((product) => (
        <p>{product.title}</p>
      ))} */}
    </div>
  );
};

export default Home;
