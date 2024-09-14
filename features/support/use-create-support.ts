import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ISupport } from "@/types";
import { createNewSupport } from "@/lib/actions/support";

export const useCreateSupport = () => {
  const mutation = useMutation({
    mutationFn: async (json: ISupport) => {
      const response = await createNewSupport(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Enquiry Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create an enquiry");
    },
  });
  return mutation;
};
