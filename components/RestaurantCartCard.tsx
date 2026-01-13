import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartItem } from "../storage/CartStorage";
import AppText from "../components/AppText";

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
        <AppText style={styles.restaurantName} bold>
          {restaurantName}
        </AppText>
        {onDeleteRestaurant && (
          <TouchableOpacity onPress={handleDeleteRestaurant}>
            <AppText style={styles.deleteText} bold>
              Delete All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <AppText>{item.name}</AppText>
          <View style={styles.itemRight}>
            <AppText>
              {item.quantity} x {item.price}$
            </AppText>
            {onDeleteMeal && (
              <TouchableOpacity
                onPress={() => handleDeleteMeal(item.id)}
                style={styles.deleteMealButton}
              >
                <AppText style={styles.deleteText} bold>
                  Remove
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <AppText style={styles.total} bold>
        Total: {totalPrice}$
      </AppText>

      <TouchableOpacity style={styles.orderButton} onPress={onOrderPress}>
        <AppText style={styles.orderButtonText} bold>
          Order
        </AppText>
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
  restaurantName: { fontSize: 18 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "center",
  },
  itemRight: { flexDirection: "row", alignItems: "center" },
  deleteMealButton: { marginLeft: 12 },
  deleteText: { color: "red" },
  total: { marginTop: 8 },
  orderButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff" },
});
