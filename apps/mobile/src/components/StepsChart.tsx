import type { BarVM } from "@vitallink/api";
import { StyleSheet, Text, View } from "react-native";
import { c, t } from "../theme";

/** Mobile steps plot (Figma 87:188): 150 tall, baseline 118, bars 38 wide / gap 10, 14k ceiling. */
export function StepsChart({ bars, goal }: { bars: BarVM[]; goal: number }) {
  const base = 118;
  const h = (v: number) => (Math.min(v, 14000) / 14000) * base;
  return (
    <View accessibilityRole="image" accessibilityLabel={`Steps: ${bars.map((b) => `${b.label} ${b.valueLabel}`).join(", ")}; goal ${goal}`}>
      <View style={{ height: base }}>
        <View style={[st.goal, { top: base - h(goal) }]}>
          <Text style={[t("caption", "textTertiary"), st.goalLabel]}>Goal {Math.round(goal / 1000)}k</Text>
        </View>
        <View style={st.bars}>
          {bars.map((b) => (
            <View key={b.label} style={st.col}>
              <View style={[st.bar, { height: h(b.value), backgroundColor: c[b.metGoal ? "dataActivity" : "bgBrandMuted"] }]} />
            </View>
          ))}
        </View>
      </View>
      <View style={st.axis}>
        {bars.map((b) => (
          <Text key={b.label} style={[t("labelS", "dataAxisLabel"), st.axisLabel]}>
            {b.shortLabel}
          </Text>
        ))}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  goal: { position: "absolute", left: 0, right: 0, borderTopWidth: 1, borderTopColor: c.borderStrong },
  // Mobile bars have no value labels, so the in-plot goal label from Figma can stay.
  goalLabel: { position: "absolute", left: 0, bottom: 1 },
  bars: { flex: 1, flexDirection: "row", alignItems: "flex-end", gap: 10 },
  col: { flex: 1, height: "100%", justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 6 },
  axis: { flexDirection: "row", gap: 10, marginTop: 8 },
  axisLabel: { flex: 1, textAlign: "center" },
});
