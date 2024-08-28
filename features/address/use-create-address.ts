import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IAddress, IUser } from "@/types";
import { createNewAddress } from "@/lib/actions/address";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (json: IAddress) => {
      const response = await createNewAddress(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Address Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("Failed to create a address");
    },
  });
  return mutation;
};
