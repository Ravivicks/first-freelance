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
  addToCart: (item: IProduct) => void;
  removeFromCart: (item: IProduct) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity! + 1 }
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
        toast.success("Item added to cart");
      },
      removeFromCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.filter((item) => item._id !== product._id);
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - cartItem.quantity!,
            totalPrice:
              state.totalPrice - cartItem.quantity! * product.lowestPrice,
          }));
        }
      },
      increaseQuantity: (itemId: string) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === itemId);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity! + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + cartItem.lowestPrice,
          }));
        }
      },
      decreaseQuantity: (itemId: string) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === itemId);

        if (cartItem && cartItem.quantity! > 1) {
          const updatedCart = cart.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity! - 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - cartItem.lowestPrice,
          }));
        } else if (cartItem && cartItem.quantity === 1) {
          get().removeFromCart(cartItem);
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
