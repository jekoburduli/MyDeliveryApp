import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onLoginPress: () => void;
  onSignUpPress: () => void;
};

const AuthButtons = ({ onLoginPress, onSignUpPress }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onLoginPress}>
      <Text style={styles.buttonText}>Log In</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default AuthButtons;
