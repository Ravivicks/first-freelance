"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { commonEnquiryFormSchema } from "@/lib/zod-schema";
import { useGetProduct } from "@/features/products/use-single-product";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Cart from "./Cart";
import { useCartStore } from "@/stores/useCartStore";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { CommonEnquiryForm } from "./CommonEnquiryForm";
import { useCreateCommonEnquiry } from "@/features/enquiry/use-add-common-enquiry";

type FormValues = z.input<typeof commonEnquiryFormSchema>;

const CommonEnquireDialog = () => {
  const { isOpen, onClose, id, type } = useCommonEnquiry(); // Add `type` for enquiry type
  const mutation = useCreateCommonEnquiry();
  const { user } = useUser();
  const { data: product, isLoading } = useGetProduct(
    id === "cart" ? "" : id || ""
  );
  const { cart } = useCartStore();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const renderDialogContent = () => {
    if (isLoading) {
      return (
        <div className="flex gap-7 justify-center items-center h-full">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={30}
            height={50}
            className="animate-spin"
          />
          <p>Loading ...</p>
        </div>
      );
    }

    switch (type) {
      case "cart":
        return <Cart />;

      case "priceRequest":
        return (
          <div className="flex gap-2 items-center my-5">
            <Image
              src={product?.image || ""}
              alt={product?.title || ""}
              width={50}
              height={100}
              unoptimized
            />
            <div className="flex gap-1 flex-col">
              <p className="text-xs font-semibold">{product?.title}</p>
              <p className="text-xs text-muted-foreground font-semibold">
                {product?.currency}
                {product?.currentPrice}
              </p>
            </div>
          </div>
        );

      case "quickQuote":
        // No product details, just return form directly
        return null;

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "quickQuote"
              ? "Quick Quote Form"
              : "Please Confirm Your Details"}
          </DialogTitle>
        </DialogHeader>

        {/* Render dynamic content based on enquiry type */}
        {renderDialogContent()}

        {/* Common enquiry form for all types */}
        <CommonEnquiryForm
          type={type}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            email: user?.emailAddresses[0].emailAddress || "",
            mobile: "",
            productId: product?._id || "",
            productName: product?.title || "",
            productPrice: product?.lowestPrice || 0,
            enquiryDescription: "",
            quantity: 1,
            status: "pending",
            enquiryType: type || "",
            reason: "",
            ...(id === "cart" && {
              cartProduct: cart.map((item) => ({
                quantity: item.quantity,
                productId: item._id,
                productName: item.title,
                productPrice: item.currentPrice,
              })),
            }),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CommonEnquireDialog;
