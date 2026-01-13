import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";

type Props = {
  duration?: number;
  nextScreen: string;
};

export default function SplashScreen({ duration = 1000, nextScreen }: Props) {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await Asset.fromModule(
        require("../assets/Welcome/splash.png")
      ).downloadAsync();
      setReady(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          router.replace(nextScreen);
        }, duration);
      });
    };

    load();
  }, [nextScreen, duration]);

  if (!ready) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../assets/Welcome/splash.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
  },
});
