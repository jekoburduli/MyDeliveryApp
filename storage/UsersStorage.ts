import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: string;
  name: string;
  email: string;
};

type UserStore = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, data: Partial<User>) => void;
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

export const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      users: [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
      ],

      addUser: (user) =>
        set((state) => {
          state.users.push(user);
        }),

      removeUser: (id) =>
        set((state) => {
          state.users = state.users.filter((user) => user.id !== id);
        }),

      updateUser: (id, data) =>
        set((state) => {
          const user = state.users.find((u) => u.id === id);
          if (user) Object.assign(user, data);
        }),
    })),
    {
      name: "users",
      storage,
    }
  )
);
