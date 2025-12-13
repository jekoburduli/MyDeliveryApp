import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Link href="/Main/Home" style={styles.link}>
        Go To Home Page
      </Link>
    </View>
  );
}

// Disable the header
export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  link: { fontSize: 18, color: "blue" },
});
