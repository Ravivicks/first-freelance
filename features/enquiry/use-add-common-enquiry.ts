import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CommonEnquireProps } from "@/types";
import { createNewCommonEnquiry } from "@/lib/actions/enquries";

export const useCreateCommonEnquiry = () => {
  const mutation = useMutation({
    mutationFn: async (json: CommonEnquireProps) => {
      const response = await createNewCommonEnquiry(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Enquiry Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create an enquiry");
    },
  });
  return mutation;
};
