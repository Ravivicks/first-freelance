"use client";

import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formAddressSchema } from "@/lib/zod-schema";
import { AddressForm } from "./AddressForm";
import { useAddressOpen } from "@/hooks/use-address-open";
import { useGetAddress } from "@/features/address/use-get-address";
import { Loader2 } from "lucide-react";
import { useCreateAddress } from "@/features/address/use-create-address";

type FormValues = z.input<typeof formAddressSchema>;

const AddressDialog = () => {
  const { isOpen, onClose, id } = useAddressOpen();
  const mutation = useCreateAddress();
  const { data, isLoading } = useGetAddress(id ?? ""); // Ensure `id` is not undefined

  const onSubmit = async (values: FormValues) => {
    sessionStorage.setItem("email", values.email);
    mutation.mutate(values, {
      onSuccess: async () => {
        onClose(false); // Close the dialog
      },
    });
  };

  // Define default values, whether data is available or not
  const defaultValue = data
    ? {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
        email: data.email,
        phone: data.phone,
      }
    : {
        _id: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        email: "",
        phone: "",
      };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto max-w-full md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {id ? "Edit Existing Address" : "Add New Delivery Address"}
          </DialogTitle>
          <DialogDescription>
            Please fill in the form below to {id ? "update" : "add"} your
            address details.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AddressForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValue}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
