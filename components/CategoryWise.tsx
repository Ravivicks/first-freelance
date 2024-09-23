"use client";
import React from "react";
import GridView from "./GridView";
import { useTranslations } from "next-intl";

const CategoryWise = () => {
  const t = useTranslations("industryAutomation");
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold uppercase text-center mb-8">
        {t("title")}
      </h1>
      <GridView />
    </div>
  );
};

export default CategoryWise;
