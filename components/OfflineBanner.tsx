// components/NetworkAlerts.tsx
import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const NetworkAlerts = () => {
  const wasConnected = useRef(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === false && wasConnected.current) {
        Alert.alert("No Internet", "You are currently offline!");
        wasConnected.current = false;
      } else if (state.isConnected === true && !wasConnected.current) {
        Alert.alert("Back Online", "You are connected to the internet!");
        wasConnected.current = true;
      }
    });

    return () => unsubscribe();
  }, []);
};
