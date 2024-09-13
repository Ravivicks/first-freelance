import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IComment, IReply } from "@/types";
import { updateReview } from "@/lib/actions/review";

export const useUpdateReview = () => {
  const mutation = useMutation({
    mutationFn: async ({
      reviewId,
      reply,
    }: {
      reviewId: string;
      reply: IReply;
    }) => {
      const response = await updateReview(reviewId, reply);
      return response;
    },
    onSuccess: () => {
      toast.success("Reply Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to submit reply");
    },
  });
  return mutation;
};
