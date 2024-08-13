"use client";
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
    </>
  );
};

export default SheetProvider;
