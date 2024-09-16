import create from "zustand";
import { persist } from "zustand/middleware";
import { getAllStaticData } from "@/lib/actions/static"; // Ensure the path is correct

interface StaticDataState {
  data: any; // Adjust the type according to your data
  isLoading: boolean;
  error: Error | null;
  fetchData: (locale?: string, type?: string) => Promise<void>; // Optional locale and type parameters
}

export const useStaticDataStore = create<StaticDataState>()(
  persist(
    (set, get) => ({
      data: null,
      isLoading: false,
      error: null,
      fetchData: async (locale: string = "en", type: string = "") => {
        set({ isLoading: true });
        try {
          const response = await getAllStaticData(locale, type); // Fetch the new data

          // Merge the new data with the existing data
          const currentData = get().data; // Get the current state of data
          const mergedData = currentData
            ? { ...currentData, ...response } // Merge if current data exists
            : response; // If no current data, use the new response directly

          set({ data: mergedData, isLoading: false, error: null });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error
                : new Error("An unknown error occurred"),
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "static-data-storage", // Persist the store in localStorage or another storage
    }
  )
);
