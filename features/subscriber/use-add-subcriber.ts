import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ISubscriber } from "@/types";
import { createNewSubcriber } from "@/lib/actions/subscriber";

export const useCreateSubscriber = () => {
  const mutation = useMutation({
    mutationFn: async (json: ISubscriber) => {
      const response = await createNewSubcriber(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Newsletter Subscribed Successfully");
    },
    onError: () => {
      toast.error("Failed to subscribed Newsletter");
    },
  });
  return mutation;
};
