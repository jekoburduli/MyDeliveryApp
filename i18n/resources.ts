import { en } from "./en";
import { ka } from "./ka";

export const resources = {
  en: { translation: en },
  ka: { translation: ka },
} as const;

export type TranslationKeys = keyof typeof en;
