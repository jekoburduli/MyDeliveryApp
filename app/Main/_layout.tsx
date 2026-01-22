import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

export default function MainLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            title: t("home", { defaultValue: "Home" }),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            header: () => (
              <Header
                location={t("location", { defaultValue: "Tbilisi, Georgia" })}
                onCartPress={() => router.push("./Cart")}
                onProfilePress={() => router.push("./Profile")}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Cart"
          options={{
            title: t("cart", { defaultValue: "Cart" }),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: t("profile", { defaultValue: "Profile" }),
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
