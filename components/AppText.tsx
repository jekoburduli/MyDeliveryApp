import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

type Props = TextProps & {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
};

export default function AppText({ bold, style, ...props }: Props) {
  const { i18n } = useTranslation();
  const isGeorgian = i18n.language === "ka";
  const fontFamily = isGeorgian ? "NotoGeo" : "Inter";
  const fontWeight = bold ? "700" : "400";

  return <Text {...props} style={[{ fontFamily, fontWeight }, style]} />;
}
