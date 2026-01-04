import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartItem } from "../storage/CartStorage";

type Props = {
  restaurantName: string;
  items: CartItem[];
  onOrderPress: () => void;
  onDeleteRestaurant?: () => void;
  onDeleteMeal?: (mealId: string) => void;
};

export default function RestaurantCartCard({
  restaurantName,
  items,
  onOrderPress,
  onDeleteRestaurant,
  onDeleteMeal,
}: Props) {
  const totalPrice = Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const handleDeleteRestaurant = () => {
    if (!onDeleteRestaurant) return;
    Alert.alert(
      "Delete Restaurant",
      `Remove all meals from ${restaurantName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDeleteRestaurant },
      ]
    );
  };

  const handleDeleteMeal = (id: string) => {
    if (!onDeleteMeal) return;
    onDeleteMeal(id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        {onDeleteRestaurant && (
          <TouchableOpacity onPress={handleDeleteRestaurant}>
            <Text style={styles.deleteText}>Delete All</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name}</Text>
          <View style={styles.itemRight}>
            <Text>
              {item.quantity} x {item.price}$
            </Text>
            {onDeleteMeal && (
              <TouchableOpacity
                onPress={() => handleDeleteMeal(item.id)}
                style={styles.deleteMealButton}
              >
                <Text style={styles.deleteText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <Text style={styles.total}>Total: {totalPrice}$</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: { fontSize: 18, fontWeight: "700" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "center",
  },
  itemRight: { flexDirection: "row", alignItems: "center" },
  deleteMealButton: { marginLeft: 12 },
  deleteText: { color: "red", fontWeight: "700" },
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
