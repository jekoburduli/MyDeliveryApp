// app/screens/ProfileScreen.tsx
import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useUserStore } from "../../storage/UsersStorage";
import AuthButtons from "../../components/AuthButtons";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import ProfileInfo from "../../components/ProfileInfo";
import { useTranslation } from "react-i18next";
import AppText from "../../components/AppText";
import { containers, typography, layout } from "../../styles/unistyles";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { users, currentUserId, logout } = useUserStore();

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId),
    [users, currentUserId],
  );

  const [mode, setMode] = useState<"login" | "signup" | null>(null);

  if (!currentUser) {
    return (
      <View style={[containers.screen, containers.centered]}>
        <AppText style={[typography.h1, layout.mbL]} bold>
          {t("notLoggedIn")}
        </AppText>

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

export default ProfileScreen;
