import { getAllProductso } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const query = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getAllProductso();
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      return response as IProduct[];
    },
  });
  return query;
};
