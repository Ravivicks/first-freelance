"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchComponent from "./Search";
import { useSearchOpen } from "@/hooks/use-search-open";
import { useTranslations } from "next-intl";

const SearchDialog = () => {
  const { isOpen, onClose } = useSearchOpen();
  const t = useTranslations("searchDialog"); // Specify the namespace

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto max-w-full h-[550px] md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <DialogHeader className="h-fit">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col fixed top-24 w-full px-4">
          <SearchComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
