import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useCartStore, CartItem } from "../../storage/CartStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCartCard from "../../components/RestaurantCartCard";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import AppText from "../../components/AppText";

export default function Cart() {
  const { t } = useTranslation();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearRestaurant = useCartStore((state) => state.clearRestaurant);

  const groupedItems: Record<string, CartItem[]> = items.reduce((acc, item) => {
    if (!acc[item.restaurantName]) acc[item.restaurantName] = [];
    acc[item.restaurantName].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const restaurantNames = Object.keys(groupedItems);

  const handleOrderPress = (restaurantName: string, items: CartItem[]) => {
    const mealNames = items.map((i) => i.name).join(", ");
    Toast.show({
      type: "success",
      text1: `${t("order_from", {
        restaurant: restaurantName,
        defaultValue: `Order from ${restaurantName}`,
      })}`,
      text2: `${t("meals", {
        meals: mealNames,
        defaultValue: `Meals: ${mealNames}`,
      })}`,
      position: "bottom",
      topOffset: 200,
      visibilityTime: 3000,
      autoHide: true,
    });

    router.push({
      pathname: "/CheckoutScreen",
      params: {
        restaurantName,
        items: JSON.stringify(items),
      },
    });
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <AppText style={styles.emptyText} bold>
          {t("emptycart", { defaultValue: "Your cart is empty" })}
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {restaurantNames.map((name) => (
          <RestaurantCartCard
            key={name}
            restaurantName={name}
            items={groupedItems[name]}
            onOrderPress={() => handleOrderPress(name, groupedItems[name])}
            onDeleteRestaurant={() => clearRestaurant(name)}
            onDeleteMeal={(mealId) => removeItem(mealId, name)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#555",
  },
});
