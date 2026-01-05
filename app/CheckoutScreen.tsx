import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import CheckoutMap from "../components/CheckoutMap";
import { Notification } from "../utils/Notification";
import NotificationSound from "../utils/sounds/NotificationSound.mp3";

type CartItem = { id: string; name: string; price: number; quantity: number };

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{
    restaurantName?: string;
    items?: string;
  }>();
  const restaurantName = params.restaurantName || "Restaurant";
  const cartItems: CartItem[] = params.items ? JSON.parse(params.items) : [];

  const [deliveryLocation, setDeliveryLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [courierInstructions, setCourierInstructions] = useState("");
  const [restaurantInstructions, setRestaurantInstructions] = useState("");

  const total = Number(
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)
  );

  const handleConfirmOrder = () => {
    if (!deliveryLocation) {
      Alert.alert("Select location first!");
      return;
    }
    if (!name || !lastName || !phone) {
      Alert.alert("Enter your details!");
      return;
    }
    console.log({
      restaurantName,
      cartItems,
      deliveryLocation,
      customer: { name, lastName, phone },
      courierInstructions,
      restaurantInstructions,
    });
    //Alert.alert("Order confirmed!");
    Notification(`Ordered Condirmed from ${restaurantName}`, NotificationSound);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.restaurant}>{restaurantName}</Text>
        <Text style={styles.title}>Your Order</Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {item.quantity} x {item.price}$
            </Text>
          </View>
        ))}

        <Text style={styles.total}>Total: {total}$</Text>

        <Text style={styles.formTitle}>Delivery Information</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Courier Instructions (optional)"
          style={styles.input}
          value={courierInstructions}
          onChangeText={setCourierInstructions}
        />

        <Text style={styles.formTitle}>Restaurant Instructions (optional)</Text>
        <TextInput
          placeholder="Special requests"
          style={styles.input}
          value={restaurantInstructions}
          onChangeText={setRestaurantInstructions}
        />

        <Text style={styles.formTitle}>Delivery Location</Text>
        <CheckoutMap
          initialLocation={{ latitude: 41.7151, longitude: 44.8271 }}
          onLocationSelect={setDeliveryLocation}
        />

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginHorizontal: 12,
  },
  restaurant: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontWeight: "600",
    color: "#333",
  },
  total: {
    fontWeight: "700",
    fontSize: 18,
    textAlign: "right",
    marginTop: 8,
    marginBottom: 16,
    color: "#111",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
