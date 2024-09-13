import { create } from "zustand";

type NewCheckoutState = {
  data?: {
    paymentMethod: string;
  }[]; // Store the data array
  id?: string; // Store the id
  isOpen: boolean; // Store whether the checkout modal is open or not
  onOpen: (id: string, data: any[]) => void; // Function accepting two arguments
  onClose: () => void; // Function to close the checkout
};

export const useCheckoutOpen = create<NewCheckoutState>((set) => ({
  data: [], // Initial empty data
  id: undefined, // Initial id
  isOpen: false, // Initial closed state
  onOpen: (id: string, data: any[]) => set({ isOpen: true, id, data }), // Open with id and data
  onClose: () => set({ isOpen: false, id: undefined, data: [] }), // Close and reset state
}));
