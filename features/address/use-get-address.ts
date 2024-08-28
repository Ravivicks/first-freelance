import { getAddressById } from "@/lib/actions/address";
import { IAddress } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAddress = (id: string) => {
  const query = useQuery<IAddress, Error>({
    enabled: !!id,
    queryKey: ["address", { id }],
    queryFn: async () => {
      const response = await getAddressById(id);
      if (!response) {
        throw new Error("Failed to fetch address");
      }
      return response;
    },
  });
  return query;
};
