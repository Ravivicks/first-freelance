"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supportSchema } from "@/lib/zod-schema";
import { useUser } from "@clerk/nextjs";
import { useSupportOpen } from "@/hooks/use-support-open";
import { useCreateSupport } from "@/features/support/use-create-support";
import { SupportForm } from "./SupportForm";

type FormValues = z.input<typeof supportSchema>;

const SupportDialog = () => {
  const { isOpen, onClose } = useSupportOpen();
  const mutation = useCreateSupport();
  const { user } = useUser();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <DialogHeader>
            <DialogTitle>Please Enter Your Details</DialogTitle>
          </DialogHeader>
          {/* <div className="flex justify-between w-full space-x-4"> */}

          <div>
            <SupportForm
              onSubmit={onSubmit}
              disabled={mutation.isPending}
              defaultValues={{
                email: user?.emailAddresses[0].emailAddress || "",
                title: "",
                description: "",
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
