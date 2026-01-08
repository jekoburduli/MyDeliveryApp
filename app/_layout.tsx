import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export default function RootLayout() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Notifications permission not granted!");
        }
      }
    };

    requestPermissions();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </>
    </I18nextProvider>
  );
}
