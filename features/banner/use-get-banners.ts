import { getAllBanners } from "@/lib/actions/banner";
import { IPartnerBannerFile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetBanners = (title?: string) => {
  const query = useQuery<IPartnerBannerFile[], Error>({
    queryKey: ["banners", title], // Include title in the queryKey for caching
    queryFn: async () => {
      const response = await getAllBanners(title); // Pass the title to the function
      if (!response) {
        throw new Error("Failed to fetch banners");
      }
      return response;
    },
    enabled: !!title || title === undefined, // Only run if title is defined or if it's fetching all banners
    refetchOnWindowFocus: false,
  });
  return query;
};
