// Mobile reads the same generated tokens as web. Native platforms need one font
// family per weight, so text styles are mapped onto the loaded Inter faces.
import { colors, elevation, text as textStyles, type ColorToken, type TextStyle } from "@vitallink/tokens";
import type { TextStyle as RNTextStyle } from "react-native";

export const c = colors.light;
export const col = (t: ColorToken) => c[t];

const FAMILY: Record<string, string> = {
  "400": "Inter_400Regular",
  "500": "Inter_500Medium",
  "600": "Inter_600SemiBold",
  "700": "Inter_700Bold",
};

export function t(name: TextStyle, color?: ColorToken): RNTextStyle {
  const s = textStyles[name];
  return {
    fontFamily: s.fontFamily === "RobotoMono" ? "RobotoMono_400Regular" : FAMILY[s.fontWeight],
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    ...(color ? { color: c[color] } : null),
  };
}

export const shadow = { card: { boxShadow: elevation.card } };
