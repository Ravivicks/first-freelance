import { IProduct } from "@/types";
import React from "react";

type Props = {
  products?: IProduct[];
};

const ProductCard = ({ products }: Props) => {
  return (
    <div>
      {products?.map((product) => (
        <p key={product._id}>{product.title}</p>
      ))}
    </div>
  );
};

export default ProductCard;
