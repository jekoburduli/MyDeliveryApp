import { Link } from "expo-router";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "../components/AppText";
export default function WelcomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      <Image
        source={require("../assets/Welcome/WelcomeImage.jpg")}
        style={styles.image}
      />

      <AppText style={styles.title} bold>
        {t("welcome")}
      </AppText>
      <Link href="/Main/Home" asChild>
        <TouchableOpacity style={styles.button}>
          <AppText style={styles.buttonText} bold>
            {t("getStarted")}
          </AppText>
        </TouchableOpacity>
      </Link>
      <Link href="/Main/Profile" asChild>
        <TouchableOpacity style={styles.button}>
          <AppText style={styles.buttonText} bold>
            {t("profile")}
          </AppText>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd3acff",
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "#ff6a00ff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 35,
    elevation: 3,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  topCircle: {
    position: "absolute",
    top: -60,
    left: -60,
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 107, 0, 0.15)",
    borderRadius: 60,
  },
  bottomCircle: {
    position: "absolute",
    bottom: -80,
    right: -80,
    width: 160,
    height: 160,
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    borderRadius: 80,
  },
});
