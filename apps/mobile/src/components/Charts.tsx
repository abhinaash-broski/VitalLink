// Mobile charts drawn from data with token colours.
import type { ColorToken } from "@vitallink/tokens";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { c, t } from "../theme";

/** Concentric activity rings (Today 86:56: 92px, 10px rings, 2px apart; Calories 134:216). */
export function Rings({ rings, size = 92, stroke = 10, gap = 2 }: { rings: { fraction: number; color: ColorToken; label: string }[]; size?: number; stroke?: number; gap?: number }) {
  const mid = size / 2;
  return (
    <Svg width={size} height={size} accessibilityLabel={rings.map((r) => `${r.label} ${Math.round(r.fraction * 100)}%`).join(", ")}>
      {rings.map((r, i) => {
        const radius = mid - stroke / 2 - i * (stroke + gap);
        const len = 2 * Math.PI * radius;
        return [
          <Circle key={`${r.label}-track`} cx={mid} cy={mid} r={radius} fill="none" stroke={c.bgMuted} strokeWidth={stroke} />,
          <Circle
            key={r.label}
            cx={mid}
            cy={mid}
            r={radius}
            fill="none"
            stroke={c[r.color]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${len * Math.min(1, r.fraction)} ${len}`}
            transform={`rotate(-90 ${mid} ${mid})`}
          />,
        ];
      })}
    </Svg>
  );
}

/** Stacked day bars (Screen time 87:374: 150 plot, baseline 118, 38px bars, 10 apart). */
export function StackBars({ days, scale, base = 118, label }: { days: { label: string; segments: { value: number; color: ColorToken }[] }[]; scale: number; base?: number; label: string }) {
  return (
    <View accessibilityRole="image" accessibilityLabel={label}>
      <View style={[st.plot, { height: base }]}>
        {days.map((d, i) => (
          <View key={i} style={st.col}>
            {[...d.segments].reverse().map((s, j) => (
              <View key={j} style={{ height: s.value * scale, backgroundColor: c[s.color] }} />
            ))}
          </View>
        ))}
      </View>
      <View style={st.axis}>
        {days.map((d, i) => (
          <Text key={i} style={[t("labelS", "dataAxisLabel"), st.axisLabel]}>
            {d.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  plot: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
  col: { flex: 1, justifyContent: "flex-end" },
  axis: { flexDirection: "row", gap: 10, marginTop: 8 },
  axisLabel: { flex: 1, textAlign: "center" },
});
