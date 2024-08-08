import React from "react";
import GridView from "./GridView";

interface IProps {
  title: string;
  images?: {
    title: string;
    url: string;
    src: string;
  };
}

const CategoryWise = ({ images, title = "Industry Automation" }: IProps) => {
  return (
    <div className="mb-16">
      <h1 className="text-4xl font-extrabold uppercase text-center mb-16">
        {title}
      </h1>
      <GridView />
    </div>
  );
};

export default CategoryWise;
