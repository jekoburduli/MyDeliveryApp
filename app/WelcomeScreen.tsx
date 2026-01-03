import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome!</Text>

      <Link href="/Main/Home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Disable header
export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd3acff", // soft warm background
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff6a00ff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 35,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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
