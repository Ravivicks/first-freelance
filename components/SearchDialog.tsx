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

const SearchDialog = () => {
  const { isOpen, onClose } = useSearchOpen();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-auto max-w-full h-[55%] md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <DialogHeader className="h-fit">
          <DialogTitle>Search Product Here</DialogTitle>
          <DialogDescription>
            Search product by Brand and title.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col fixed top-20 w-full pl-6 pr-8">
          <SearchComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
