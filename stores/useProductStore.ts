import { getAllProducts } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { create } from "zustand";

interface State {
  products: IProduct[];
  isLoading: boolean;
  error: any;
  currentPage: number;
  brandFilter?: string;
}

interface Actions {
  fetchData: (
    page?: number,
    pageSize?: number,
    brand?: string
  ) => Promise<void>;
  setPage: (page: number) => void;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  brandFilter: undefined,
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  brandFilter: INITIAL_STATE.brandFilter,
  fetchData: async (page = 1, pageSize = 20, brand) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getAllProducts(page, pageSize, brand);
      set((state) => ({
        products: page === 1 ? response : [...state.products, ...response],
        isLoading: false,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  setPage: (page: number) => {
    set((state) => ({
      currentPage: page,
    }));
  },
}));
