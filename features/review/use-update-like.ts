import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IComment } from "@/types";
import { updateLikeCount } from "@/lib/actions/review";

export const useUpdateLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      reviewId,
      userId,
      likeType,
    }: {
      reviewId: string;
      userId: string;
      likeType: "like" | "unlike";
    }) => {
      const response = await updateLikeCount(reviewId, userId, likeType);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Like count updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["reviews-by-productId", data?.productId],
      });
    },
    onError: () => {
      toast.error("Failed to update like count");
    },
  });

  return mutation;
};
