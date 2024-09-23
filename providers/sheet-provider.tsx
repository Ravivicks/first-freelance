"use client";
import AddressDialog from "@/components/AddressDialog";
import CartSheet from "@/components/CartSheet";
import CheckoutDialog from "@/components/CheckoutDialog";
import CommonEnquireDialog from "@/components/CommonEnquiryDialog";
import FilterDialog from "@/components/FilterDialog";
import SearchDialog from "@/components/SearchDialog";
import SupportDialog from "@/components/SupportDialog";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CartSheet />
      <AddressDialog />
      <FilterDialog />
      <CheckoutDialog />
      <SearchDialog />
      <CommonEnquireDialog />
      <SupportDialog />
    </>
  );
};

export default SheetProvider;
