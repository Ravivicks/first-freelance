"use client";
import AddressDialog from "@/components/AddressDialog";
import BannerDialog from "@/components/BannerDialog";
import CartSheet from "@/components/CartSheet";
import EnquireDialog from "@/components/EnquireDialog";
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
    </>
  );
};

export default SheetProvider;
