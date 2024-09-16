import { getAllProducts } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { create } from "zustand";

interface State {
  products: Record<string, IProduct[]>; // Manage multiple product lists by key
  isLoading: boolean;
  error: any;
  currentPage: Record<string, number>; // Track current page for each key
  totalPages: number; // Single value for totalPages
  totalCount: number; // Single value for totalCount
  brandFilter?: string;
  typeFilter?: string;
  brands: { label: string; value: string }[];
  types: { label: string; value: string }[];
  categories: { label: string; value: string }[];
}

interface Actions {
  fetchData: (
    key: string, // Add key to fetchData
    page?: number,
    pageSize?: number,
    filters?: Record<string, any>,
    locale?: string // Add locale to fetchData
  ) => Promise<void>;
  setPage: (key: string, page: number) => void;
}

const INITIAL_STATE: State = {
  products: {},
  isLoading: false,
  error: null,
  currentPage: {},
  totalPages: 0,
  totalCount: 0,
  brands: [],
  types: [],
  categories: [],
  brandFilter: undefined,
  typeFilter: undefined,
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  totalPages: INITIAL_STATE.totalPages,
  totalCount: INITIAL_STATE.totalCount,
  brandFilter: INITIAL_STATE.brandFilter,
  typeFilter: INITIAL_STATE.typeFilter,
  brands: INITIAL_STATE.brands,
  types: INITIAL_STATE.types,
  categories: INITIAL_STATE.categories,

  fetchData: async (
    key,
    page = 1,
    pageSize = 20,
    filters = {},
    locale = "en"
  ) => {
    try {
      set({ isLoading: true, error: null });

      // Fetch products, totalCount, and metadata from the API with dynamic filters and locale
      const { products, totalCount, brands, types, categories } =
        await getAllProducts(page, pageSize, filters, locale);

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / pageSize);

      set((state) => ({
        products: {
          ...state.products,
          [key]:
            page === 1
              ? products // Replace products on the first page
              : [...(state.products[key] || []), ...products], // Append products on subsequent pages
        },
        isLoading: false,
        currentPage: {
          ...state.currentPage,
          [key]: page,
        },
        totalPages, // Single value for totalPages
        totalCount, // Single value for totalCount
        brands, // Update brands from the API
        types, // Update types from the API
        categories, // Update categories from the API
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  setPage: (key, page) => {
    set((state) => ({
      currentPage: {
        ...state.currentPage,
        [key]: page,
      },
    }));
  },
}));
