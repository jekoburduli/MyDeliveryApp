import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Restaurant } from "../storage/RestaurantStore";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const router = useRouter();

  const handlePress = () => {
    Toast.show({
      type: "success",
      text1: `${restaurant.name} selected`,
      position: "bottom",
    });

    router.push({
      pathname: "/MenuScreen",
      params: { restaurantId: restaurant.id },
    });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={restaurant.image}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.details}>
            ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
            {restaurant.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: { alignItems: "center" },
  card: {
    width: 360,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  image: { width: "100%", height: 210 },
  infoContainer: { padding: 12, backgroundColor: "#fdfdfd" },
  name: { fontSize: 18, fontWeight: "700", color: "#222" },
  details: { fontSize: 13, color: "#555", marginTop: 4 },
});

export default RestaurantCard;
