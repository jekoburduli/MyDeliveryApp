import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

type Props = TextProps & {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
};

const LANG_MAP = {
  ka: {
    fontFamily: "NotoGeo",
  },
  en: {
    fontFamily: "Inter",
  },
} as const;

export default function AppText({ bold, style, ...props }: Props) {
  const { i18n } = useTranslation();

  const lang = i18n.language as keyof typeof LANG_MAP;
  const fontFamily = LANG_MAP[lang]?.fontFamily ?? "Inter";
  const fontWeight: TextStyle["fontWeight"] = bold ? "700" : "400";

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
          fontWeight,
        },
        style,
      ]}
    />
  );
}
