import { create } from "zustand";

// Define the possible enquiry types
type EnquiryType =
  | "cart"
  | "priceRequest"
  | "quickQuote"
  | "quoteRequest"
  | "serviceQuote"
  | "entireProjectQuote";

type NewCommonEnquireState = {
  type?: EnquiryType; // Add type to represent the type of enquiry
  id?: string;
  isOpen: boolean;
  onOpen: (type: EnquiryType, id?: string) => void; // Accept type in onOpen
  onClose: () => void;
};

export const useCommonEnquiry = create<NewCommonEnquireState>((set) => ({
  type: undefined, // Initialize with undefined type
  id: undefined,
  isOpen: false,
  onOpen: (type: EnquiryType, id?: string) => set({ isOpen: true, type, id }), // Set both id and type on open
  onClose: () => set({ isOpen: false, type: undefined, id: undefined }), // Reset type on close
}));
