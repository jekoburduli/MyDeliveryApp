import { useEffect } from "react";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const OfflineBanner = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert("No Internet", "You are currently offline!");
      }
    });

    return () => unsubscribe();
  }, []);
};
