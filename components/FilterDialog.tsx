"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { useProductsStore } from "@/stores/useProductStore";
import { useFilterOpen } from "@/hooks/use-filter-open";
import { CheckBoxLists } from "./CheckBoxLists";
import { useTranslations } from "next-intl";

const FilterDialog = () => {
  const { isLoading } = useProductsStore();
  const { isOpen, onClose } = useFilterOpen();
  const t = useTranslations("filterDialog");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="scrollable-form px-2 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
          <DialogDescription>{t("dialogDescription")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <div>
            <Separator className="my-2" />
            <CheckBoxLists />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
