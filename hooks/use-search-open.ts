import { create } from "zustand";

type NewSearchState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSearchOpen = create<NewSearchState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
