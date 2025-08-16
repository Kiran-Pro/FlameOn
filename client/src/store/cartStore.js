// src/store/cartStore.js
import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  // Add product
  addToCart: (product) =>
    set((state) => {
      let exists = false;

      const updatedCart = state.cart.map((item) => {
        if (item.name === product.name) {
          exists = true;
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      if (exists) {
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  // Update quantity
  updateQuantity: (name, newQty) =>
    set((state) => {
      if (newQty <= 0) {
        // remove item if quantity becomes 0
        return {
          cart: state.cart.filter((item) => item.name !== name),
        };
      }

      const updatedCart = state.cart.map((item) => {
        if (item.name === name) {
          return { ...item, quantity: newQty };
        } else {
          return item;
        }
      });

      return { cart: updatedCart };
    }),

  // Remove product completely
  removeFromCart: (name) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== name),
    })),

  // Clear all items
  emptyCart: () => set({ cart: [] }),
}));
