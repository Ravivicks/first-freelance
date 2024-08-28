import { create } from "zustand";

type NewAddressState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: (isOpen: boolean) => void;
};

export const useAddressOpen = create<NewAddressState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: (isOpen) => {
    if (!isOpen) {
      set({ isOpen: false, id: undefined });
    }
  },
}));
