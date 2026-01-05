import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  location: string;
  onCartPress?: () => void;
  onProfilePress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  location,
  onCartPress,
  onProfilePress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={30} color="#555" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <View style={styles.icons}>
          <TouchableOpacity onPress={onProfilePress} style={styles.icon}>
            <Ionicons name="person-outline" size={30} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCartPress} style={styles.icon}>
            <Ionicons name="cart-outline" size={30} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
});

export default Header;
