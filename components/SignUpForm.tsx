import React, { useCallback, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";

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

const SignUpForm = ({ onCancel }: Props) => {
  const { addUser, login, users } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignUp = useCallback(() => {
    if (!name || !email || !password) return alert("All fields are required");
    if (!validateEmail(email)) return alert("Enter a valid email");
    if (password.length < 6)
      return alert("Password must be at least 6 characters");
    if (!acceptedTerms) return alert("You must accept the Terms & Conditions");
    if (users.find((u) => u.email === email))
      return alert("Email already exists");

    const newUser = { id: Date.now().toString(), name, email, password };
    addUser(newUser);
    login(newUser.email, newUser.password);

    Notification(
      "Welcome",
      `Hi ${name}, thanks for signing up!`,
      NotificationSound,
    );
  }, [name, email, password, acceptedTerms, users]);

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

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

      {/* Checkbox with fixed spacing */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: spacing.m,
        }}
      >
        <Checkbox
          value={acceptedTerms}
          onValueChange={setAcceptedTerms}
          color={acceptedTerms ? colors.primary : undefined}
        />
        <AppText style={{ marginLeft: spacing.s }}>
          I accept Terms & Conditions
        </AppText>
      </View>

      <TouchableOpacity style={buttons.primary} onPress={handleSignUp}>
        <AppText style={typography.button} bold>
          Sign Up
        </AppText>
      </TouchableOpacity>

      {/* Centered Cancel */}
      <TouchableOpacity
        onPress={onCancel}
        style={{ marginTop: spacing.m, alignSelf: "center" }}
      >
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

export default SignUpForm;
