import "expo-constants";

declare module "expo-constants" {
  interface ExpoConfig {
    extra: {
      GEOAPIFY_KEY: string;
    };
  }

  interface Constants {
    expoConfig: ExpoConfig;
  }
}
