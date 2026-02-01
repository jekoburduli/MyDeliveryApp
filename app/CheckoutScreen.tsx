import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Notification } from "../utils/Notification";
import NotificationSound from "../utils/sounds/NotificationSound.mp3";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../components/AppText";
import { useLocationStore } from "../storage/LocationStore";

type CartItem = { id: string; name: string; price: number; quantity: number };

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{
    restaurantName?: string;
    items?: string;
  }>();
  const restaurantName = params.restaurantName || "Restaurant";

  const cartItems: CartItem[] = useMemo(() => {
    return params.items ? JSON.parse(params.items) : [];
  }, [params.items]);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [courierInstructions, setCourierInstructions] = useState("");
  const [restaurantInstructions, setRestaurantInstructions] = useState("");
  const { selectedLocation } = useLocationStore();

  const total = useMemo(() => {
    return Number(
      cartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
    );
  }, [cartItems]);

  const renderedCartItems = useMemo(() => {
    return cartItems.map((item) => (
      <View key={item.id} style={styles.item}>
        <AppText style={styles.itemName}>{item.name}</AppText>
        <AppText style={styles.itemPrice} bold>
          {item.quantity} x {item.price}$
        </AppText>
      </View>
    ));
  }, [cartItems]);

  const handleConfirmOrder = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Select location first!");
      return;
    }
    if (!name || !lastName || !phone) {
      Alert.alert("Enter your details!");
      return;
    }
    router.back();
    Notification(
      `Success!`,
      `Order Confirmed from ${restaurantName}`,
      NotificationSound,
    );
  }, [selectedLocation, name, lastName, phone, restaurantName]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <AppText style={styles.backText}>← Back</AppText>
        </TouchableOpacity>

        <AppText style={styles.restaurant} bold>
          {restaurantName}
        </AppText>

        <AppText style={styles.title} bold>
          Your Order
        </AppText>

        {renderedCartItems}

        <AppText style={styles.total} bold>
          Total: {total}$
        </AppText>

        <AppText style={styles.formTitle} bold>
          Delivery Information
        </AppText>
        <TextInput
          placeholder="First Name"
          style={[styles.input, { fontFamily: "Inter" }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Last Name"
          style={[styles.input, { fontFamily: "Inter" }]}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone"
          style={[styles.input, { fontFamily: "Inter" }]}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Courier Instructions (optional)"
          style={[styles.input, { fontFamily: "Inter" }]}
          value={courierInstructions}
          onChangeText={setCourierInstructions}
        />

        <AppText style={styles.formTitle} bold>
          Restaurant Instructions (optional)
        </AppText>
        <TextInput
          placeholder="Special requests"
          style={[styles.input, { fontFamily: "Inter" }]}
          value={restaurantInstructions}
          onChangeText={setRestaurantInstructions}
        />

        <AppText style={styles.formTitle} bold>
          Delivery Location
        </AppText>

        <AppText style={{ marginBottom: 8 }}>
          {selectedLocation
            ? `Address: ${selectedLocation.address}`
            : "No address selected"}
        </AppText>

        <TouchableOpacity
          onPress={() => router.push("/SelectAddressScreen")}
          style={styles.selectLocationButton}
        >
          <AppText style={{ color: "#007AFF" }}>Select your location</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <AppText style={styles.confirmButtonText} bold>
            Confirm Order
          </AppText>
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
  },
  restaurant: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: 20,
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
    color: "#333",
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    textAlign: "right",
    marginTop: 8,
    marginBottom: 16,
    color: "#111",
  },
  formTitle: {
    fontSize: 18,
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
    fontSize: 18,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
    alignSelf: "flex-start",
  },
  selectLocationButton: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
});
