import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IComment } from "@/types";
import { createNewReview } from "@/lib/actions/review";

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (json: IComment) => {
      const response = await createNewReview(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Review Submitted Successfully");
      // Invalidate the query with the productId included in the key
      queryClient.invalidateQueries({
        queryKey: ["reviews-by-productId", productId],
      });
    },
    onError: () => {
      toast.error("Failed to create a Review");
    },
  });
  return mutation;
};
