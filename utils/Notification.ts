export const Notification = async (
  title: string,
  message: string,
  soundFile: any,
) => {
  try {
    await import("expo-notifications").then((Notifications) =>
      Notifications.scheduleNotificationAsync({
        content: { title, body: message },
        trigger: null,
      }),
    );

    const { Audio } = await import("expo-av");
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  } catch (err) {
    console.log("Notification/Audio error:", err);
  }
};
