import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SelectedLocation = {
  latitude: number;
  longitude: number;
  address: string;
};

type LocationStore = {
  selectedLocation: SelectedLocation | null;
  setLocation: (location: SelectedLocation) => void;
  clearLocation: () => void;
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

export const useLocationStore = create<LocationStore>()(
  persist(
    immer((set) => ({
      selectedLocation: null,

      setLocation: (location: SelectedLocation) =>
        set((state) => {
          state.selectedLocation = location;
        }),

      clearLocation: () =>
        set((state) => {
          state.selectedLocation = null;
        }),
    })),
    {
      name: "location-storage",
      storage,
    },
  ),
);
