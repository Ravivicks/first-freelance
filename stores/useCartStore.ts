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
  clearCart: () => void;
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
        const minQuantity = product.minQuantity || 1;

        if (cartItem) {
          // Increase quantity for existing item
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: (Number(item.quantity) || minQuantity) + 1,
                }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.lowestPrice,
          }));
        } else {
          // Add new item with minimum quantity
          const updatedCart = [...cart, { ...product, quantity: minQuantity }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + minQuantity,
            totalPrice: state.totalPrice + product.lowestPrice * minQuantity,
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
            totalItems: state.totalItems - Number(cartItem.quantity),
            totalPrice:
              state.totalPrice -
              Number(cartItem.quantity) * product.lowestPrice,
          }));
          toast.success("Item removed from cart");
        }
      },
      increaseQuantity: (itemId: string) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === itemId);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === itemId
              ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
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
        const minQuantity = cartItem?.minQuantity || 1;

        if (cartItem) {
          if (Number(cartItem.quantity) > minQuantity) {
            // Decrease quantity
            const updatedCart = cart.map((item) =>
              item._id === itemId
                ? { ...item, quantity: Number(item.quantity) - 1 }
                : item
            );
            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - cartItem.lowestPrice,
            }));
          } else if (Number(cartItem.quantity) <= minQuantity) {
            // Remove item if quantity is less than or equal to minQuantity
            get().removeFromCart(cartItem);
            toast.success("Item removed from cart");
          }
        }
      },
      clearCart: () => {
        set(() => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }));
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
