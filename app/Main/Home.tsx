import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.title}>Home Screen</Text>
      <Link href="/Main/Cart" style={styles.link}>
        Go To Cart
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  link: { fontSize: 18, color: "blue" },
});
