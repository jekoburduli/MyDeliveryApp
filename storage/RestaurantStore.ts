import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  deliveryTime: number;
  isOpen: boolean;
  image: string;
  menu: MenuItem[];
};

type RestaurantStore = {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
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

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    immer((set) => ({
      restaurants: [
        {
          id: "wendys",
          name: "Wendy's",
          rating: 4.4,
          deliveryTime: 25,
          isOpen: true,
          image: require("../assets/Logos/Wendys-logo.jpg"),
          menu: [
            {
              id: "w1",
              name: "Dave’s Single",
              price: 6.99,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "w2",
              name: "Spicy Chicken Sandwich",
              price: 6.49,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "w3",
              name: "Baconator",
              price: 7.99,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "w4",
              name: "Frosty",
              price: 2.49,
              image: require("../assets/Meals/icecream.jpg"),
            },
          ],
        },

        {
          id: "mcdonalds",
          name: "McDonald’s",
          rating: 4.3,
          deliveryTime: 20,
          isOpen: true,
          image: require("../assets/Logos/macdonalds-logo.jpg"),

          menu: [
            {
              id: "m1",
              name: "Big Mac",
              price: 5.99,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "m2",
              name: "Quarter Pounder",
              price: 6.49,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "m3",
              name: "McNuggets (10pc)",
              price: 4.99,
              image: require("../assets/Meals/nuggets.jpg"),
            },
            {
              id: "m4",
              name: "Fries",
              price: 2.49,
              image: require("../assets/Meals/fries.jpg"),
            },
          ],
        },

        {
          id: "subway",
          name: "Subway",
          rating: 4.2,
          deliveryTime: 30,
          isOpen: false,
          image: require("../assets/Logos/subway-logo.jpg"),

          menu: [
            {
              id: "s1",
              name: "Italian B.M.T.",
              price: 7.99,
              image: require("../assets/Meals/sandwich.jpg"),
            },
            {
              id: "s2",
              name: "Chicken Teriyaki",
              price: 7.49,
              image: require("../assets/Meals/sandwich.jpg"),
            },
            {
              id: "s3",
              name: "Tuna Sub",
              price: 6.99,
              image: require("../assets/Meals/sandwich.jpg"),
            },
            {
              id: "s4",
              name: "Veggie Delight",
              price: 5.99,
              image: require("../assets/Meals/sandwich.jpg"),
            },
          ],
        },

        {
          id: "kfc",
          name: "KFC",
          rating: 4.1,
          deliveryTime: 28,
          isOpen: true,
          image: require("../assets/Logos/kfc-logo.jpg"),

          menu: [
            {
              id: "k1",
              name: "Original Recipe Chicken",
              price: 8.49,
              image: require("../assets/Meals/chicken.jpg"),
            },
            {
              id: "k2",
              name: "Zinger Burger",
              price: 6.99,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "k3",
              name: "Popcorn Chicken",
              price: 4.99,
              image: require("../assets/Meals/chicken.jpg"),
            },
            {
              id: "k4",
              name: "Coleslaw",
              price: 2.29,
              image: require("../assets/Meals/coleslaw.jpg"),
            },
          ],
        },

        {
          id: "burgerking",
          name: "Burger King",
          rating: 4.0,
          deliveryTime: 27,
          isOpen: true,
          image: require("../assets/Logos/burgerking-logo.jpg"),

          menu: [
            {
              id: "b1",
              name: "Whopper",
              price: 6.99,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "b2",
              name: "Chicken Royale",
              price: 6.49,
              image: require("../assets/Meals/burger.jpg"),
            },
            {
              id: "b3",
              name: "Fries",
              price: 3.49,
              image: require("../assets/Meals/fries.jpg"),
            },
            {
              id: "b4",
              name: "Milkshake",
              price: 3.99,
              image: require("../assets/Meals/milkshake.jpg"),
            },
          ],
        },

        {
          id: "dominos",
          name: "Domino’s Pizza",
          rating: 4.5,
          deliveryTime: 35,
          isOpen: true,
          image: require("../assets/Logos/Dominos-logo.jpg"),

          menu: [
            {
              id: "d1",
              name: "Pepperoni Pizza",
              price: 12.99,
              image: require("../assets/Meals/pizza.jpg"),
            },
            {
              id: "d2",
              name: "Margherita Pizza",
              price: 11.99,
              image: require("../assets/Meals/pizza.jpg"),
            },
            {
              id: "d3",
              name: "BBQ Chicken Pizza",
              price: 13.99,
              image: require("../assets/Meals/pizza.jpg"),
            },
            {
              id: "d4",
              name: "Garlic Bread",
              price: 4.49,
              image: require("../assets/Meals/garlicbread.jpg"),
            },
          ],
        },

        {
          id: "starbucks",
          name: "Starbucks",
          rating: 4.6,
          deliveryTime: 15,
          isOpen: true,
          image: require("../assets/Logos/starbucks-logo.jpg"),

          menu: [
            {
              id: "st1",
              name: "Caffè Latte",
              price: 4.99,
              image: require("../assets/Meals/coffee.jpg"),
            },
            {
              id: "st2",
              name: "Cappuccino",
              price: 4.79,
              image: require("../assets/Meals/coffee.jpg"),
            },
            {
              id: "st3",
              name: "Iced Coffee",
              price: 3.99,
              image: require("../assets/Meals/coffee.jpg"),
            },
            {
              id: "st4",
              name: "Chocolate Muffin",
              price: 2.99,
              image: require("../assets/Meals/muffin.jpg"),
            },
          ],
        },

        {
          id: "tacobell",
          name: "Taco Bell",
          rating: 4.2,
          deliveryTime: 22,
          isOpen: false,
          image: require("../assets/Logos/tacobell-logo.jpg"),

          menu: [
            {
              id: "t1",
              name: "Crunchy Taco",
              price: 2.49,
              image: require("../assets/Meals/taco.jpg"),
            },
            {
              id: "t2",
              name: "Burrito Supreme",
              price: 4.99,
              image: require("../assets/Meals/burito.jpg"),
            },
            {
              id: "t3",
              name: "Quesadilla",
              price: 5.49,
              image: require("../assets/Meals/quesadilla.jpg"),
            },
            {
              id: "t4",
              name: "Nachos BellGrande",
              price: 6.49,
              image: require("../assets/Meals/nacho.jpeg"),
            },
          ],
        },
      ],

      addRestaurant: (restaurant) =>
        set((state) => {
          state.restaurants.push(restaurant);
        }),
    })),
    {
      name: "restaurants",
      storage,
    }
  )
);
