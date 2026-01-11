import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { OfflineBanner } from "../components/OfflineBanner";
import { useFonts } from "expo-font";

export default function RootLayout() {
  OfflineBanner();

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

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <>
        <StatusBar style="dark" />
        {/* <OfflineBanner /> */}
        <Stack screenOptions={{ headerShown: false }} />
      </>
    </I18nextProvider>
  );
}
