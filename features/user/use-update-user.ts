import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/actions/user"; // Ensure the import path is correct
import { IUser, UpdateUserInput } from "@/types";

// Create the hook for updating a user
export const useUpdateUser = () => {
  const mutation = useMutation<IUser, Error, { updates: UpdateUserInput }>({
    mutationFn: async ({ updates }) => {
      const response = await updateUser(updates);
      if (!response) {
        throw new Error("Failed to update user");
      }
      return response;
    },
    onError: (error) => {
      // Handle error if needed
      console.error("Update failed:", error);
    },
    onSuccess: (data) => {
      // Handle success if needed
      console.log("Update successful:", data);
    },
  });

  return mutation;
};
