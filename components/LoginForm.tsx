import React, { useCallback, useState } from "react";
import { useUserStore } from "../storage/UsersStorage";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Notification } from "../utils/Notification";
import AppText from "../components/AppText";

import NotificationSound from "../utils/sounds/NotificationSound.mp3";
type Props = { onCancel: () => void };

const LoginForm = ({ onCancel }: Props) => {
  const { users, login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(() => {
    if (!email || !password) return alert("All fields are required");

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      login(user.email, user.password);
      Notification(`Hi!`, `Welcome Back!`, NotificationSound);
    } else alert("Invalid email or password");
  }, [email, password]);

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <AppText style={styles.buttonText} bold>
          Submit
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <AppText style={styles.link} bold>
          Cancel
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { width: "100%", alignItems: "center" },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
  link: { color: "#3498db", marginTop: 10, fontSize: 16 },
});

export default LoginForm;
