import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { NetworkAlerts } from "../components/OfflineBanner";
import { useFonts } from "expo-font";
import { preloadAssets } from "../utils/preloadAssets";

export default function RootLayout() {
  NetworkAlerts();
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    NotoGeo: require("../assets/fonts/NotoSansGeorgian-VariableFont_wdth,wght.ttf"),
  });

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

  useEffect(() => {
    (async () => {
      await preloadAssets();
      setReady(true);
    })();
  }, []);

  if (!fontsLoaded || !ready) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </>
    </I18nextProvider>
  );
}
