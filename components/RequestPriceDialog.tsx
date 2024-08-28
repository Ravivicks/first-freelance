"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { requestPriceFormSchema } from "@/lib/zod-schema";
import { useGetProduct } from "@/features/products/use-single-product";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { RequestPriceForm } from "./RequestPriceForm";
import { useCreateRequestPrice } from "@/features/price-request/use-add-enquiry";
import { usePriceRequest } from "@/hooks/use-price-request-open";

type FormValues = z.input<typeof requestPriceFormSchema>;

const RequestPriceDialog = () => {
  const { isOpen, onClose, id } = usePriceRequest();
  const mutation = useCreateRequestPrice();
  const { user } = useUser();
  const { data: product, isLoading } = useGetProduct(id || "");

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {isLoading ? (
          <div className="flex gap-7 justify-center items-center h-full">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={30}
              height={50}
              className="animate-spin"
            />
            <p>Laoding ...</p>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle>Please Confirm Your Details</DialogTitle>
            </DialogHeader>
            {/* <div className="flex justify-between w-full space-x-4"> */}
            <div className="flex gap-2 items-center my-5">
              <Image
                src={product?.image || ""}
                alt={product?.title || ""}
                width={50}
                height={100}
              />
              <div className="flex gap-1 flex-col">
                <p className="text-xs font-semibold">{product?.title}</p>
                {product?.lowestPrice !== 0 && (
                  <p className="text-xs text-muted-foreground font-semibold">
                    {product?.currency}
                    {product?.lowestPrice}
                  </p>
                )}
              </div>
            </div>
            <div>
              <RequestPriceForm
                onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{
                  email: user?.emailAddresses[0].emailAddress || "",
                  mobile: "",
                  productId: product?._id || "",
                  productName: product?.title || "",
                  priceDescription: "",
                  quantity: 1,
                  status: "pending",
                  reason: "",
                }}
              />
            </div>
          </div>
          // </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestPriceDialog;
