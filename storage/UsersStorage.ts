import { create } from "zustand";

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

export const useUserStore = create<UserStore>((set, get) => ({
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  ],

  addUser: (user) => set({ users: [...get().users, user] }),

  removeUser: (id) =>
    set({ users: get().users.filter((user) => user.id !== id) }),

  updateUser: (id, data) =>
    set({
      users: get().users.map((user) =>
        user.id === id ? { ...user, ...data } : user
      ),
    }),
}));
