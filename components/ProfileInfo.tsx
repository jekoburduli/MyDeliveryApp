import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  email: string;
  onLogout: () => void;
};

const ProfileInfo = ({ name, email, onLogout }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome, {name}!</Text>
    <Text style={styles.text}>Email: {email}</Text>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#e74c3c" }]}
      onPress={onLogout}
    >
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default ProfileInfo;
