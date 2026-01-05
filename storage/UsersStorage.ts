import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type UserStore = {
  users: User[];
  currentUserId: string | null;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
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
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "123456",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          password: "abcdef",
        },
      ],
      currentUserId: null,

      addUser: (user) =>
        set((state) => {
          state.users.push(user);
        }),

      removeUser: (id) =>
        set((state) => {
          state.users = state.users.filter((u) => u.id !== id);
          if (state.currentUserId === id) state.currentUserId = null;
        }),

      updateUser: (id, data) =>
        set((state) => {
          const user = state.users.find((u) => u.id === id);
          if (user) Object.assign(user, data);
        }),

      login: (email, password) =>
        set((state) => {
          const user = state.users.find(
            (u) => u.email === email && u.password === password
          );
          if (user) {
            state.currentUserId = user.id;
          } else {
            throw new Error("Invalid email or password");
          }
        }),

      logout: () =>
        set((state) => {
          state.currentUserId = null;
        }),
    })),
    {
      name: "users",
      storage,
    }
  )
);
