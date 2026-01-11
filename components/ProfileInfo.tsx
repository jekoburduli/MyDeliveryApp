import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "../components/AppText";

type Props = {
  name: string;
  email: string;
  onLogout: () => void;
};

const ProfileInfo = ({ name, email, onLogout }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppText style={styles.title} bold>
        {t("welcomeUser", { name })}
      </AppText>
      <AppText style={styles.text}>
        {t("email")}: {email}
      </AppText>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={onLogout}
      >
        <AppText style={styles.buttonText} bold>
          {t("logout")}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
});

export default ProfileInfo;
