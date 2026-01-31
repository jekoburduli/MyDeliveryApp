import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "./AppText";
import i18n from "../i18n";

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
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "en" ? "ka" : "en";
    i18n.changeLanguage(newLang);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={28} color="#555" />
          <AppText style={styles.locationText} bold>
            {location}
          </AppText>
        </View>

        <View style={styles.icons}>
          <TouchableOpacity onPress={onProfilePress} style={styles.icon}>
            <Ionicons name="person-outline" size={28} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onCartPress} style={styles.icon}>
            <Ionicons name="cart-outline" size={28} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleLanguage} style={styles.icon}>
            <AppText style={styles.flag}>
              {i18n.language === "ka" ? "🇺🇸" : "🇬🇪"}
            </AppText>
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
    minHeight: 60,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 6,
    fontSize: 17,
    color: "#333",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 12,
  },
  flag: {
    fontSize: 30,
    lineHeight: 34,
  },
});

export default Header;
