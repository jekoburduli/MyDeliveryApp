import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

export const Notification = async (message: string, soundFile: any) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome!",
        body: message,
      },
      trigger: null,
    });

    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  } catch (err) {
    console.log("Notification/Audio error:", err);
  }
};
