import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Toast from "react-native-toast-message";

export default function MainLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            header: () => (
              <Header
                location="Tbilisi, Georgia"
                onCartPress={() => router.push("./Cart")}
                onProfilePress={() => router.push("./Profile")}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
