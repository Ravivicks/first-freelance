"use client";
import AddressDialog from "@/components/AddressDialog";
import BannerDialog from "@/components/BannerDialog";
import CartSheet from "@/components/CartSheet";
import CheckoutDialog from "@/components/CheckoutDialog";
import EnquireDialog from "@/components/EnquireDialog";
import FilterDialog from "@/components/FilterDialog";
import RequestPriceDialog from "@/components/RequestPriceDialog";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CartSheet />
      <EnquireDialog />
      <BannerDialog />
      <AddressDialog />
      <FilterDialog />
      <RequestPriceDialog />
      <CheckoutDialog />
    </>
  );
};

export default SheetProvider;
