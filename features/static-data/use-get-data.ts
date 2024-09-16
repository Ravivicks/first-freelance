// hooks/useFetchStaticData.ts

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

export const useFetchStaticData = (locale: string, type: string) => {
  const { fetchData } = useStaticDataStore((state) => ({
    fetchData: state.fetchData,
  }));

  useEffect(() => {
    // Use default locale 'en' if locale is undefined or empty
    const currentLocale = locale;
    fetchData(currentLocale as string, type);
  }, [locale, fetchData, type]); // Refetch when locale or fetchData changes
};
