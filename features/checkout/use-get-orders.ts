import { getOrderByUserId } from "@/lib/actions/checkout";
import { CheckoutData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (id: string) => {
  const query = useQuery<CheckoutData[], Error>({
    enabled: !!id,
    queryKey: ["orders", { id }],
    queryFn: async () => {
      const response = await getOrderByUserId(id);
      if (!response) {
        throw new Error("Failed to fetch order");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
