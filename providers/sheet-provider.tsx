"use client";
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
    </>
  );
};

export default SheetProvider;
