// app/index.tsx
import React from "react";
import SplashScreen from "../components/SplashScreen";

export default function Index() {
  return <SplashScreen duration={1000} nextScreen="/WelcomeScreen" />;
}
