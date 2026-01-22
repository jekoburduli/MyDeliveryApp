import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Restaurant } from "../storage/RestaurantStore";
import { useTranslation } from "react-i18next";
import AppText from "../components/AppText";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const deliveryMinutes = restaurant.deliveryTime;

  const deliveryText = useMemo(() => {
    let deliveryText2 = "";
    if (deliveryMinutes >= 60) {
      const hours = Math.floor(deliveryMinutes / 60);
      deliveryText2 = `${hours} ${t("hour")}`;
    } else {
      deliveryText2 = `${deliveryMinutes} ${t("minute")}`;
    }
    return deliveryText2;
  }, []);

  const openText = restaurant.isOpen ? t("open") : t("closed");

  const handlePress = () => {
    Toast.show({
      type: "success",
      text1: `${restaurant.name} ${t("selected")}`,
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
          <AppText style={styles.name} bold>
            {restaurant.name}
          </AppText>
          <AppText style={styles.details}>
            ⭐ {restaurant.rating} • {deliveryText} • {openText}
          </AppText>
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
  name: { fontSize: 18, color: "#222" },
  details: { fontSize: 13, color: "#555", marginTop: 4 },
});

export default RestaurantCard;
