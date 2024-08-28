"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { AddressForm } from "./AddressForm";
import { formAddressSchema } from "@/lib/zod-schema";
import { useAddressOpen } from "@/hooks/use-address-open";
import { z } from "zod";

const AddressSheet = () => {
  const savedAddresses = [
    {
      id: 1,
      fullName: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipcode: "10001",
      phone: "9711974149",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zipcode: "90001",
      phone: "9711974149",
    },
  ];

  type FormValues = z.input<typeof formAddressSchema>;

  const { isOpen, onClose } = useAddressOpen();

  const onSubmit = (values: FormValues) => {
    // mutation.mutate(values, {
    //   onSuccess: () => onClose(),
    // });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <AddressForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValues={{
            fullName: "",
            address: "",
            city: "",
            state: "",
            zipcode: "",
            phone: "",
            email: "",
          }}
          existingAddresses={savedAddresses}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AddressSheet;
