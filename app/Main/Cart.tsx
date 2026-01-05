import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCartStore, CartItem } from "../../storage/CartStorage";
import { SafeAreaView } from "react-native-safe-area-context";

import RestaurantCartCard from "../../components/RestaurantCartCard";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function Cart() {
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
      text1: `Order from ${restaurantName}`,
      text2: `Meals: ${mealNames}`,
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
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#555",
  },
});
