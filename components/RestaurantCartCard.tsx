import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CartItem } from "../storage/CartStorage";

type Props = {
  restaurantName: string;
  items: CartItem[];
  onOrderPress: () => void;
};

export default function RestaurantCartCard({
  restaurantName,
  items,
  onOrderPress,
}: Props) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.card}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name}</Text>
          <Text>
            {item.quantity} x {item.price}
          </Text>
        </View>
      ))}

      <Text style={styles.total}>Total: {totalPrice}</Text>

      <TouchableOpacity style={styles.orderButton} onPress={onOrderPress}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  restaurantName: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  total: { fontWeight: "700", marginTop: 8 },
  orderButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff", fontWeight: "600" },
});
