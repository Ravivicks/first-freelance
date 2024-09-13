import { getReviewByProductId } from "@/lib/actions/review";
import { IComment } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewByProductId = (id: string) => {
  const query = useQuery<IComment[], Error>({
    enabled: !!id,
    queryKey: ["reviews-by-productId", id],
    queryFn: async () => {
      const response = await getReviewByProductId(id);
      if (!response) {
        throw new Error("Failed to fetch reviews");
      }
      return response;
    },
  });
  return query;
};
