import { loadPrivacy, type AccessCardVM, type AccessRowVM } from "@vitallink/api";
import type { ColorToken } from "@vitallink/tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Card, ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { c, t } from "../theme";

// Mobile frame 151:944 colours the summary values with goal tokens, unlike desktop.
const TONE: Record<AccessCardVM["tone"], { bg: ColorToken; value: ColorToken }> = {
  default: { bg: "bgSurface", value: "textPrimary" },
  brand: { bg: "bgBrandSubtle", value: "goalOnTrack" },
  warning: { bg: "rangeBorderlineBg", value: "goalAtRisk" },
  critical: { bg: "rangeHighBg", value: "goalMissed" },
};
const STATUS: Record<string, ColorToken> = { Authorised: "goalAchieved", Limited: "goalAtRisk", Blocked: "goalMissed" };

// Mobile shows the latest access per kind of actor: a doctor, an app, and anything blocked.
function recent(log: AccessRowVM[]) {
  const pick = [log.find((r) => r.shortStatus === "Authorised"), log.find((r) => r.shortStatus === "Limited"), log.find((r) => r.shortStatus === "Blocked")];
  return pick.filter((r): r is AccessRowVM => !!r);
}

export function PrivacyScreen() {
  const state = useScreen(loadPrivacy);
  const router = useRouter();
  if (state.status !== "ready") return <ScreenState state={state} />;
  const p = state.data;

  return (
    <View style={st.screen}>
      <Header title="Privacy" subtitle="Who can see your data, and when" onBack={() => (router.canGoBack() ? router.back() : router.replace("/profile"))} />
      <ScrollView contentContainerStyle={st.content}>
        <View style={st.grid}>
          {p.summary.map((s) => (
            <View key={s.key} style={[st.tile, { backgroundColor: c[TONE[s.tone].bg] }]} accessibilityLabel={`${s.label}: ${s.value}, ${s.caption}`}>
              <Text style={t("labelM", "textSecondary")}>{s.label}</Text>
              <Text style={t("metricM", TONE[s.tone].value)}>{s.value}</Text>
              <Text style={t("caption", "textTertiary")}>{s.caption}</Text>
            </View>
          ))}
        </View>

        <Card style={st.card}>
          <Text style={[t("h5", "textPrimary"), st.cardTitle]}>Recent access</Text>
          {recent(p.log).map((r) => (
            <View key={r.who + r.when} style={st.row}>
              <View style={st.flex}>
                <Text style={t("bodySStrong", "textPrimary")}>{r.who}</Text>
                <Text style={t("caption", "textTertiary")} numberOfLines={1}>
                  {r.accessed} · {r.when}
                </Text>
              </View>
              <Text style={t("labelM", STATUS[r.shortStatus] ?? "textSecondary")}>{r.shortStatus}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bgCanvas },
  content: { padding: 16, gap: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  tile: { flexBasis: "40%", flexGrow: 1, padding: 14, borderRadius: 12, gap: 4 },
  card: { padding: 16 },
  cardTitle: { marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, borderTopWidth: 1, borderTopColor: c.borderSubtle },
  flex: { flex: 1 },
});
