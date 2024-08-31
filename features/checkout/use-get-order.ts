import { getAddressById } from "@/lib/actions/address";
import { getOrderById } from "@/lib/actions/checkout";
import { CheckoutData, IAddress } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = (id: string) => {
  const query = useQuery<CheckoutData, Error>({
    enabled: !!id,
    queryKey: ["address", { id }],
    queryFn: async () => {
      const response = await getOrderById(id);
      if (!response) {
        throw new Error("Failed to fetch order");
      }
      return response;
    },
  });
  return query;
};
