import { getProductById } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id: string, locale: string = "en") => {
  const query = useQuery<IProduct, Error>({
    enabled: !!id,
    queryKey: ["product", { id, locale }], // Add locale to queryKey to refetch on locale change
    queryFn: async () => {
      const response = await getProductById(id, locale); // Pass locale to the API call
      if (!response) {
        throw new Error("Failed to fetch product");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
