import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PriceRequestProps } from "@/types";
import { createNewPriceRequest } from "@/lib/actions/priceRequest";

export const useCreateRequestPrice = () => {
  const mutation = useMutation({
    mutationFn: async (json: PriceRequestProps) => {
      const response = await createNewPriceRequest(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Price Request Enquiry Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create an enquiry");
    },
  });
  return mutation;
};
