import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, restaurantName: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    restaurantName: string
  ) => void;
  clearCart: () => void;
};

const storage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: AsyncStorage.removeItem,
};

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.restaurantName === item.restaurantName
          );

          if (existing) {
            existing.quantity += item.quantity;
          } else {
            state.items.push(item);
          }
        }),

      removeItem: (id, restaurantName) =>
        set((state) => {
          state.items = state.items.filter(
            (i) => i.id !== id || i.restaurantName !== restaurantName
          );
        }),

      updateQuantity: (id, quantity, restaurantName) =>
        set((state) => {
          const item = state.items.find(
            (i) => i.id === id && i.restaurantName === restaurantName
          );
          if (item) item.quantity = quantity;
        }),

      clearCart: () =>
        set((state) => {
          state.items = [];
        }),
    })),
    {
      name: "cart-storage",
      storage,
    }
  )
);
