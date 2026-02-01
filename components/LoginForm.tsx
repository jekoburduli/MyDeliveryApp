import React, { useCallback, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { useUserStore } from "../storage/UsersStorage";
import { Notification } from "../utils/Notification";
import NotificationSound from "../utils/sounds/NotificationSound.mp3";
import AppText from "../components/AppText";

import {
  containers,
  buttons,
  typography,
  spacing,
  colors,
  layout,
} from "../styles/unistyles";

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
      Notification("Hi!", "Welcome Back!", NotificationSound);
    } else {
      alert("Invalid email or password");
    }
  }, [email, password, users, login]);

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

      <TouchableOpacity style={buttons.primary} onPress={handleLogin}>
        <AppText style={typography.button} bold>
          Submit
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity onPress={onCancel} style={layout.mtM}>
        <AppText style={[typography.body, { color: colors.primary }]} bold>
          Cancel
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    ...containers.centered,
    width: "100%",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.m,
    marginBottom: spacing.m,
    fontSize: 16,
    color: colors.textDark,
  },
});

export default LoginForm;
