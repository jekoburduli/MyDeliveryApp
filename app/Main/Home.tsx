import { View, Text, FlatList, Pressable } from "react-native";
import { useRestaurantStore } from "../../storage/RestaurantStore";

export default function Home() {
  // Selector example
  const restaurants = useRestaurantStore((state) => state.restaurants);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Restaurants</Text>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
}
