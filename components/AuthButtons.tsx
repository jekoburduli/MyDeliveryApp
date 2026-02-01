// app/components/AuthButtons.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { containers, buttons, typography, layout } from "../styles/unistyles";

type Props = {
  onLoginPress: () => void;
  onSignUpPress: () => void;
};

const AuthButtons = ({ onLoginPress, onSignUpPress }: Props) => {
  return (
    <View style={[containers.columnCenter, layout.fullWidth]}>
      <TouchableOpacity
        style={[buttons.primary, layout.mbM]}
        onPress={onLoginPress}
      >
        <AppText style={typography.button} bold>
          Log In
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[buttons.primary, layout.mbM]}
        onPress={onSignUpPress}
      >
        <AppText style={typography.button} bold>
          Sign Up
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default AuthButtons;
