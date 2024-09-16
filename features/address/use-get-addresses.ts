import { getAllAddresses } from "@/lib/actions/address";
import { IAddress } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAddresses = (email: string) => {
  const query = useQuery<IAddress[], Error>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await getAllAddresses(email);
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      return (response as IAddress[]) || [];
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
