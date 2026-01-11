import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRestaurantStore, MenuItem } from "../storage/RestaurantStore";
import { useCartStore } from "../storage/CartStorage";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../components/AppText";

const MenuScreen = () => {
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();

  const restaurant = useRestaurantStore((state) =>
    state.restaurants.find((r) => r.id === restaurantId)
  );

  const addItem = useCartStore((state) => state.addItem);

  if (!restaurant)
    return <AppText style={styles.error}>Restaurant not found</AppText>;

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
        <AppText style={styles.menuName}>{item.name}</AppText>
        <AppText style={styles.menuPrice}>${item.price.toFixed(2)}</AppText>

        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <AppText style={styles.quantityButtonText} bold>
                -
              </AppText>
            </TouchableOpacity>
            <AppText style={styles.quantityText} bold>
              {quantities[item.id]}
            </AppText>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <AppText style={styles.quantityButtonText} bold>
                +
              </AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.addButton}
          >
            <AppText style={styles.addButtonText} bold>
              Add
            </AppText>
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
              <AppText style={styles.backText}>← Back</AppText>
            </TouchableOpacity>

            <Image
              source={restaurant.image}
              style={styles.restaurantImage}
              contentFit="cover"
            />
            <AppText style={styles.restaurantName} bold>
              {restaurant.name}
            </AppText>
            <AppText style={styles.restaurantDetails}>
              ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
              {restaurant.isOpen ? "Open" : "Closed"}
            </AppText>
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
  restaurantName: { fontSize: 22, color: "#222" },
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
  menuName: { fontSize: 18, color: "#222" },
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
  quantityButtonText: { fontSize: 18, color: "#333" },
  quantityText: { marginHorizontal: 12, fontSize: 16 },

  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 14 },

  error: { flex: 1, textAlign: "center", marginTop: 50, fontSize: 16 },
});

export default MenuScreen;
