import { getAllBanners } from "@/lib/actions/banner";
import { getAllStaticData } from "@/lib/actions/static";
import { IPartnerBannerFile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetOtherPageData = (locale: string, type: string) => {
  const query = useQuery({
    queryKey: ["other-data", type], // Include title in the queryKey for caching
    queryFn: async () => {
      const response = await getAllStaticData(locale, type); // Pass the title to the function
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
