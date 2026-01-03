import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRestaurantStore, MenuItem } from "../storage/RestaurantStore";
import { useCartStore } from "../storage/CartStorage";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";

const MenuScreen = () => {
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();

  const restaurant = useRestaurantStore((state) =>
    state.restaurants.find((r) => r.id === restaurantId)
  );

  const addItem = useCartStore((state) => state.addItem);

  if (!restaurant)
    return <Text style={styles.error}>Restaurant not found</Text>;

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(restaurant.menu.map((item) => [item.id, 1]))
  );

  const increaseQuantity = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  const decreaseQuantity = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));

  const handleAddToCart = (item: MenuItem) => {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantities[item.id],
      restaurantName: restaurant.name,
    };

    addItem(newItem);

    Toast.show({
      type: "success",
      text1: `${item.name} added to cart`,
      position: "bottom",
    });
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <Image source={item.image} style={styles.menuImage} contentFit="cover" />
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantities[item.id]}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Image
              source={restaurant.image}
              style={styles.restaurantImage}
              contentFit="cover"
            />
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantDetails}>
              ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
              {restaurant.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { alignItems: "center", padding: 16, backgroundColor: "#fff" },
  backText: {
    fontSize: 16,
    color: "#007AFF",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  restaurantName: { fontSize: 22, fontWeight: "700", color: "#222" },
  restaurantDetails: { fontSize: 14, color: "#555", marginTop: 4 },

  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  menuImage: { width: "100%", height: 180 },
  menuInfo: { padding: 12 },
  menuName: { fontSize: 18, fontWeight: "600", color: "#222" },
  menuPrice: { fontSize: 16, color: "#555", marginBottom: 8 },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  quantityButtonText: { fontSize: 18, fontWeight: "600", color: "#333" },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: "600" },

  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  error: { flex: 1, textAlign: "center", marginTop: 50, fontSize: 16 },
});

export default MenuScreen;
