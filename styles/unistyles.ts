import { TextStyle, ViewStyle } from "react-native";

export const colors = {
  primary: "#007AFF",
  secondary: "#e0e0e0",
  danger: "#e74c3c",

  background: "#f5f5f5",
  white: "#ffffff",
  black: "#000000",

  textDark: "#333333",
  textMedium: "#444444",
  textLight: "#555555",
  border: "#dddddd",
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 24,
    color: colors.textDark,
  },
  h2: {
    fontSize: 20,
    color: colors.textDark,
  },
  body: {
    fontSize: 16,
    color: colors.textMedium,
  },
  small: {
    fontSize: 14,
    color: colors.textLight,
  },
  button: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
};

export const containers: Record<string, ViewStyle> = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.l,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.l,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
};

export const buttons: Record<string, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  danger: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
};

export const layout: Record<string, ViewStyle> = {
  fullWidth: {
    width: "100%",
  },

  mtS: { marginTop: spacing.s },
  mtM: { marginTop: spacing.m },
  mtL: { marginTop: spacing.l },

  mbS: { marginBottom: spacing.s },
  mbM: { marginBottom: spacing.m },
  mbL: { marginBottom: spacing.l },

  mlM: { marginLeft: spacing.m },
  mrM: { marginRight: spacing.m },
};

export const rows: Record<string, ViewStyle> = {
  center: {
    flexDirection: "row",
    alignItems: "center",
  },
};
