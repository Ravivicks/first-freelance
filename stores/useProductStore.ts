import { getAllProducts } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { create } from "zustand";

interface State {
  products: IProduct[];
  isLoading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  brandFilter?: string;
  brands: { label: string; value: string }[];
  types: { label: string; value: string }[];
  categories: { label: string; value: string }[];
  typeFilter?: string; // Add typeFilter to the state
}

interface Actions {
  fetchData: (
    page?: number,
    pageSize?: number,
    filters?: Record<string, any> // Add type parameter to fetchData
  ) => Promise<void>;
  setPage: (page: number) => void;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  brands: [],
  types: [],
  categories: [],
  brandFilter: undefined,
  typeFilter: undefined, // Initialize typeFilter
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  totalPages: INITIAL_STATE.totalPages,
  brandFilter: INITIAL_STATE.brandFilter,
  typeFilter: INITIAL_STATE.typeFilter,
  totalCount: INITIAL_STATE.totalCount,
  brands: INITIAL_STATE.brands,
  types: INITIAL_STATE.types,
  categories: INITIAL_STATE.categories,

  fetchData: async (page = 1, pageSize = 20, filters = {}) => {
    try {
      set({ isLoading: true, error: null });

      // Fetch products and totalCount from the API with dynamic filters
      const { products, totalCount, brands, types, categories } =
        await getAllProducts(page, pageSize, filters);

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / pageSize);

      set((state) => ({
        products: page === 1 ? products : [...state.products, ...products],
        isLoading: false,
        totalPages,
        totalCount,
        brands,
        types,
        categories,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },
}));
