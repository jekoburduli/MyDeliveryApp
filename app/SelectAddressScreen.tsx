import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useLocationStore } from "../storage/LocationStore";
import { useRouter } from "expo-router";
import CheckoutMap from "../components/CheckoutMap";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import AppText from "../components/AppText";

const GEOAPIFY_KEY = "28a1a196afef44a8ab4752357bffb5ec";

export default function SelectAddressScreen() {
  const { setLocation } = useLocationStore();
  const router = useRouter();

  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleQueryChange = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return setSuggestions([]);

    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          text,
        )}&limit=5&apiKey=${GEOAPIFY_KEY}`,
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.log("Autocomplete error:", err);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (feature: any) => {
    const coords = {
      latitude: feature.properties.lat,
      longitude: feature.properties.lon,
    };
    setSelectedMarker(coords);
    setAddress(feature.properties.formatted);
    setQuery(feature.properties.formatted);
    setSuggestions([]);
  };

  const handleLocationSelect = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    setSelectedMarker(coords);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.latitude}&lon=${coords.longitude}&apiKey=${GEOAPIFY_KEY}`,
      );
      const data = await res.json();
      const formatted = data.features[0]?.properties?.formatted || "";
      setAddress(formatted);
      setQuery(formatted);
    } catch (err) {
      console.log("Reverse geocoding error:", err);
      setAddress(null);
      setQuery("");
    }
  };

  const goToUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      setSelectedMarker({ latitude, longitude });

      try {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_KEY}`,
        );
        const data = await res.json();
        const formatted = data.features[0]?.properties?.formatted || "";
        setAddress(formatted);
        setQuery(formatted);
      } catch (err) {
        console.log("Reverse geocoding error:", err);
        setAddress(null);
        setQuery("");
      }
    } catch (err) {
      console.log("Location error:", err);
    }
  };

  const confirmAddress = () => {
    if (!selectedMarker || !address) return;
    setLocation({
      latitude: selectedMarker.latitude,
      longitude: selectedMarker.longitude,
      address,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.searchContainer}>
          <TextInput
            value={query}
            onChangeText={handleQueryChange}
            placeholder="Search for address"
            placeholderTextColor="#888"
            style={styles.input}
          />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.properties.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectSuggestion(item)}
                  style={styles.suggestionItem}
                >
                  <AppText style={styles.suggestionText}>
                    {item.properties.formatted}
                  </AppText>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>

        <View style={styles.mapContainer}>
          <CheckoutMap
            initialLocation={{ latitude: 41.7151, longitude: 44.8271 }}
            onLocationSelect={handleLocationSelect}
            selectedMarker={selectedMarker}
          />
        </View>

        <View style={styles.buttonContainer}>
          <AppText style={styles.selectedAddressText}>
            {address ? address : "Select a location on the map or via search"}
          </AppText>
          <TouchableOpacity
            onPress={confirmAddress}
            style={[
              styles.confirmButton,
              !address && { backgroundColor: "#ccc" },
            ]}
            disabled={!address}
          >
            <AppText style={styles.confirmButtonText}>
              {address ? "Confirm Address" : "Select a location first"}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.myLocationButton}
            onPress={goToUserLocation}
            activeOpacity={0.7}
          >
            <AppText style={styles.myLocationText}>Use your location</AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    zIndex: 999,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    color: "#333",
  },
  suggestionList: {
    marginTop: 8,
    maxHeight: 220,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 15,
    color: "#333",
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  selectedAddressText: {
    marginBottom: 8,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  myLocationButton: {
    marginTop: 12,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  myLocationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
