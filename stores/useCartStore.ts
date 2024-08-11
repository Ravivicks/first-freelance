import { IProduct } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: IProduct[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: IProduct) => void;
  removeFromCart: (Item: IProduct) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.lowestPrice as number) + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.lowestPrice,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.lowestPrice,
          }));
        }
        console.log("Adding to cart", product);
        toast.success("Item added to cart");
      },
      removeFromCart: (product: IProduct) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== product._id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.lowestPrice,
        }));
      },
    }),
    {
      name: "cart-storage",
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
      // version: 1, // State version number,
      // migrate: (persistedState: unknown, version: number) => {
      // 	if (version === 0) {
      // 		// if the stored value is in version 0, we rename the field to the new name
      // 		persistedState.totalProducts = persistedState.totalItems
      // 		delete persistedState.totalItems
      // 	}

      // 	return persistedState as State & Actions
      // },
    }
  )
);
