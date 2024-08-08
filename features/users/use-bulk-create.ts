import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.user.$post>;
type RequestType = InferRequestType<typeof client.api.user.$post>;

export const useBulkCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.user.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      console.log("Account created");
    },
    onError: () => {
      console.log("Failed to create an account");
    },
  });
  return mutation;
};
