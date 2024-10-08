import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkout } from "@/lib/actions/checkout";
import { CheckoutData } from "@/types";

export const useCreateCheckout = () => {
  const mutation = useMutation({
    mutationFn: async (json: CheckoutData) => {
      const response = await checkout(json);

      return response; // Return the order details from your API
    },
    onSuccess: async (data) => {
      toast.success("Order Placed Successfully");
    },
    onError: () => {
      toast.error("Failed to place an order");
    },
  });
  return mutation;
};
