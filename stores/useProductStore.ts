import { getAllProducts } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { create } from "zustand";

interface State {
  products: IProduct[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getAllProducts();
      set({ products: response, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
