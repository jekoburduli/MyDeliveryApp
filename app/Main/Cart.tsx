import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useCartStore, CartItem } from "../../storage/CartStorage";
import RestaurantCartCard from "../../components/RestaurantCartCard";
import Toast from "react-native-toast-message";

export default function Cart() {
  const cartItems = useCartStore((state) => state.items);

  const groupedItems: Record<string, CartItem[]> = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.restaurantName]) acc[item.restaurantName] = [];
      acc[item.restaurantName].push(item);
      return acc;
    },
    {} as Record<string, CartItem[]>
  );

  const restaurantNames = Object.keys(groupedItems);

  const handleOrderPress = (restaurantName: string, items: CartItem[]) => {
    const mealNames = items.map((item) => item.name).join(", ");

    Toast.show({
      type: "success",
      text1: `Order from ${restaurantName}`,
      text2: `Meals: ${mealNames}`,
      position: "bottom",
      topOffset: 200,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {restaurantNames.map((restaurantName) => (
          <RestaurantCartCard
            key={restaurantName}
            restaurantName={restaurantName}
            items={groupedItems[restaurantName]}
            onOrderPress={() =>
              handleOrderPress(restaurantName, groupedItems[restaurantName])
            }
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
