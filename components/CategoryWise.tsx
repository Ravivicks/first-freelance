"use client";
import React from "react";
import GridView from "./GridView";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

const CategoryWise = () => {
  const {
    data: staticData,
    isLoading: staticLoading,
    error: staticError,
  } = useStaticDataStore();
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold uppercase text-center mb-8">
        {staticData
          ? staticData?.industryAutomation?.title
          : "Industry Automation"}
      </h1>
      <GridView />
    </div>
  );
};

export default CategoryWise;
