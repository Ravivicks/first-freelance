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
        const minQuantity = product.minQuantity || 1; // Ensure minimum quantity is respected

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: Math.max(item.quantity! + 1, minQuantity) }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.lowestPrice,
          }));
        } else {
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
        const minQuantity = cartItem?.minQuantity || 1; // Respect minQuantity

        if (cartItem) {
          if (cartItem.quantity! > minQuantity) {
            // Decrease quantity if it's greater than minQuantity
            const updatedCart = cart.map((item) =>
              item._id === itemId
                ? {
                    ...item,
                    quantity: Math.max(item.quantity! - 1, minQuantity),
                  }
                : item
            );
            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - cartItem.lowestPrice,
            }));
          } else if (cartItem.quantity === minQuantity && minQuantity > 1) {
            // If quantity is at minQuantity and minQuantity > 1, show toast
            toast.info(
              `Cannot reduce below the minimum quantity of ${minQuantity}`
            );
          } else if (cartItem.quantity === 1 && minQuantity === 1) {
            // If quantity is 1 and minQuantity is 1, remove the item from the cart
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
