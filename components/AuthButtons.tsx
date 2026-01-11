import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "../components/AppText";

type Props = {
  onLoginPress: () => void;
  onSignUpPress: () => void;
};

const AuthButtons = ({ onLoginPress, onSignUpPress }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onLoginPress}>
      <AppText style={styles.buttonText} bold>
        Log In
      </AppText>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
      <AppText style={styles.buttonText} bold>
        Sign Up
      </AppText>
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
  buttonText: { color: "white", fontSize: 16 },
});

export default AuthButtons;
