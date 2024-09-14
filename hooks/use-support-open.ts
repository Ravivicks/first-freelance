import { create } from "zustand";

type NewSupportState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSupportOpen = create<NewSupportState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
