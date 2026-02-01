import React from "react";
import { View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { containers, buttons, typography, layout } from "../styles/unistyles";

type Props = {
  name: string;
  email: string;
  onLogout: () => void;
};

const ProfileInfo = ({ name, email, onLogout }: Props) => {
  return (
    <View style={[containers.card, layout.mtL]}>
      <AppText style={[typography.h1, layout.mbM]}>Welcome, {name}!</AppText>

      <AppText style={[typography.body, layout.mbM]}>Email: {email}</AppText>

      <TouchableOpacity style={buttons.danger} onPress={onLogout}>
        <AppText style={typography.button} bold>
          Log Out
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInfo;
