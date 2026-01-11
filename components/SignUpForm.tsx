import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useUserStore } from "../storage/UsersStorage";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";
import { Notification } from "../utils/Notification";
import NotificationSound from "../utils/sounds/NotificationSound.mp3";
import AppText from "../components/AppText";

type Props = { onCancel: () => void };

const { width, height } = Dimensions.get("window");

const SignUpForm = ({ onCancel }: Props) => {
  const { addUser, login, users } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignUp = () => {
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
    Notification(`Hi ${name}, thanks for signing up!`, NotificationSound);
  };

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="light" style={styles.blurBackground} />

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

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={acceptedTerms}
            onValueChange={setAcceptedTerms}
            color={acceptedTerms ? "#3498db" : undefined}
          />
          <AppText style={styles.checkboxText}>
            I accept Terms & Conditions
          </AppText>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <AppText style={styles.buttonText} bold>
            Sign Up
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel}>
          <AppText style={styles.link} bold>
            Cancel
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },
  form: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 16 },
  link: { color: "#3498db", marginTop: 12, fontSize: 16 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  checkboxText: { marginLeft: 8, fontSize: 14 },
});

export default SignUpForm;
