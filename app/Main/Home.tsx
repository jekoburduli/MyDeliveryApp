import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import RestaurantCard from "../../components/RestaurantCard";
import { useRestaurantStore } from "../../storage/RestaurantStore";

const Home: React.FC = () => {
  const restaurants = useRestaurantStore((state) => state.restaurants);

  return (
    <View style={styles.container}>
      <FlashList
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.subtitleText}>Restaurants</Text>
        }
        ListHeaderComponentStyle={{ marginBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  subtitleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Home;
