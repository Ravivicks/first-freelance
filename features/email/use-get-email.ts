import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetEmail = () => {
  const query = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const response = await client.api.sendemail.$get();
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      const data = await response.json();
      return data;
    },
    enabled: false,
  });
  return query;
};
