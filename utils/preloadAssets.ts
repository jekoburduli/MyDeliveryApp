import { Asset } from "expo-asset";

export async function preloadAssets() {
  try {
    const images = [
      require("../assets/Welcome/WelcomeImage.jpg"),
      require("../assets/Welcome/splash.png"),
      require("../assets/Logos/burgerking-logo.jpg"),
      require("../assets/Logos/Dominos-logo.jpg"),
      require("../assets/Logos/kfc-logo.jpg"),
      require("../assets/Logos/macdonalds-logo.jpg"),
      require("../assets/Logos/starbucks-logo.jpg"),
      require("../assets/Logos/tacobell-logo.jpg"),
      require("../assets/Logos/Wendys-logo.jpg"),
    ];

    await Asset.loadAsync(images);
  } catch (e) {
    console.warn("Failed to preload assets", e);
  }
}
