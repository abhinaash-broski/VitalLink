import type { ChipVM, MetricCardVM } from "@vitallink/api";
import type { ColorToken } from "@vitallink/tokens";
import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { Loadable } from "../data";
import { c, shadow, t } from "../theme";
import { Icon, type IconName } from "./Icon";

export function Logo() {
  return (
    <View style={st.logo}>
      <View style={st.mark}>
        <Icon name="health-17" color="textOnBrand" size={20} />
      </View>
      <Text style={t("h4", "textPrimary")}>VitalLink</Text>
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[st.card, style]}>{children}</View>;
}

export function Dot({ color, size = 8 }: { color: ColorToken; size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: c[color] }} />;
}

export function Chip({ chip }: { chip: ChipVM }) {
  return (
    <View style={[st.chip, { backgroundColor: c[chip.bg] }]}>
      <Text style={t("labelM", chip.fg)}>{chip.label}</Text>
    </View>
  );
}

export function MetricCard({ m }: { m: MetricCardVM }) {
  return (
    <Card style={st.metric}>
      <View style={st.row8}>
        <Dot color={m.accent} />
        <Text style={t("bodySStrong", "textSecondary")}>{m.shortLabel}</Text>
      </View>
      <View style={st.valueRow}>
        <Text style={t("metricL", "textPrimary")}>{m.value}</Text>
        <Text style={t("metricUnit", "textTertiary")}>{m.unit}</Text>
      </View>
      <View style={st.row8}>
        <Chip chip={m.chip} />
        <Text style={t("caption", "textTertiary")}>{m.when}</Text>
      </View>
    </Card>
  );
}

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  style,
}: {
  label: string;
  onPress?: () => void;
  /** `inverse` is the outlined button on dark screens (Welcome 146:2). */
  variant?: "primary" | "outline" | "inverse";
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
}) {
  const primary = variant === "primary";
  const inverse = variant === "inverse";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        st.btn,
        primary ? { backgroundColor: c[pressed ? "bgBrandHover" : "bgBrand"] } : inverse ? st.inverse : st.outline,
        variant === "outline" && pressed && { backgroundColor: c.bgSubtle },
        style,
      ]}
    >
      {icon && <Icon name={icon} color={primary ? "iconInverse" : "iconDefault"} />}
      <Text style={t("labelL", primary ? "textOnBrand" : inverse ? "textInverse" : "textPrimary")}>{label}</Text>
    </Pressable>
  );
}

export function ScoreRing({ score, size = 64, stroke = 7 }: { score: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, score / 100));
  return (
    <Svg width={size} height={size} accessibilityLabel={`Health score ${score} of 100`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={c.rangeNormal}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circ * frac} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

export function ScreenState({ state }: { state: Exclude<Loadable<unknown>, { status: "ready" }> }) {
  return (
    <View style={st.state}>
      {state.status === "loading" ? (
        <ActivityIndicator color={c.iconBrand} />
      ) : (
        <Text style={t("bodyM", "textCritical")}>Couldn't load this screen. {state.error.message}</Text>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  logo: { flexDirection: "row", alignItems: "center", gap: 11 },
  mark: { width: 34, height: 34, borderRadius: 10, backgroundColor: c.bgBrand, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: c.bgSurface,
    borderWidth: 1,
    borderColor: c.borderSubtle,
    borderRadius: 12,
    ...shadow.card,
  },
  metric: { width: "100%", paddingHorizontal: 20, paddingVertical: 20, gap: 10 },
  row8: { flexDirection: "row", alignItems: "center", gap: 8 },
  valueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  chip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  btn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 12, paddingVertical: 15 },
  outline: { backgroundColor: c.bgSurface, borderWidth: 1, borderColor: c.borderDefault, paddingVertical: 15 },
  inverse: { borderWidth: 1, borderColor: c.borderStrong, paddingVertical: 15 },
  state: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
});
