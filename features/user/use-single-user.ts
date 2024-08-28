import { userById } from "@/lib/actions/user";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (email: string) => {
  const query = useQuery<IUser, Error>({
    enabled: !!email,
    queryKey: ["user", { email }],
    queryFn: async () => {
      const response = await userById(email);
      if (!response) {
        throw new Error("Failed to fetch user");
      }
      return response;
    },
  });
  return query;
};
