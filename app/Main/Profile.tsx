import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "../../storage/UsersStorage";

import AuthButtons from "../../components/AuthButtons";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import ProfileInfo from "../../components/ProfileInfo";

const ProfileScreen = () => {
  const { users, currentUserId, logout } = useUserStore();
  const currentUser = users.find((u) => u.id === currentUserId);

  const [mode, setMode] = useState<"login" | "signup" | null>(null);

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You are not logged in yet</Text>

        {!mode && (
          <AuthButtons
            onLoginPress={() => setMode("login")}
            onSignUpPress={() => setMode("signup")}
          />
        )}
        {mode === "login" && <LoginForm onCancel={() => setMode(null)} />}
        {mode === "signup" && <SignUpForm onCancel={() => setMode(null)} />}
      </View>
    );
  }

  return (
    <ProfileInfo
      name={currentUser.name}
      email={currentUser.email}
      onLogout={logout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ProfileScreen;
