// app/index.tsx
import React from "react";
import SplashScreen from "../components/SplashScreen";

export default function Index() {
  return <SplashScreen duration={2000} nextScreen="/WelcomeScreen" />;
}
