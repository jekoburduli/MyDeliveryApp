import { View, Text, StyleSheet } from "react-native";

export default function CartScreen() {
  return (
    <View>
      <Text style={styles.title}>Cart Screen</Text>
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
});
