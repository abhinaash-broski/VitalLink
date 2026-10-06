// Notifications — Mobile 390 (Figma 151:575).
import { loadNotifications, NOTIFICATION_FILTERS } from "@vitallink/api";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChipRow, Row, Screen, Section, Tag } from "../components/kit";
import { Dot, ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { t } from "../theme";

const CHIPS = ["All", "Training", "Health", "Goals", "Security"];

export function NotificationsScreen() {
  const state = useScreen(loadNotifications);
  const [chip, setChip] = useState("All");
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;
  const kinds = NOTIFICATION_FILTERS[chip];
  const items = kinds ? v.items.filter((n) => kinds.includes(n.kind)) : v.items;

  return (
    <Screen title="Notifications" subtitle={v.shortSubtitle} back="/profile" chips={<ChipRow label="Notification filter" options={CHIPS} value={chip} onChange={setChip} />}>
      <Section gap={8}>
        {items.length === 0 && <Text style={t("bodyS", "textTertiary")}>Nothing here.</Text>}
        {items.map((n, i) => (
          <Row key={n.id} pad={12} style={[st.row, i === 0 && st.first]}>
            <View style={st.dot}>
              <Dot color={n.unread ? "bgBrand" : "bgMuted"} />
            </View>
            <View style={st.flex}>
              <View style={st.tagRow}>
                <Tag chip={n.tag} />
                <Text style={t("caption", "textTertiary")}>{n.when}</Text>
              </View>
              <Text style={t("bodySStrong", "textPrimary")}>{n.title}</Text>
              <Text style={t("caption", "textSecondary")}>{n.shortBody}</Text>
            </View>
          </Row>
        ))}
      </Section>
    </Screen>
  );
}

const st = StyleSheet.create({
  row: { alignItems: "flex-start", gap: 10 },
  first: { borderTopWidth: 0 },
  dot: { paddingTop: 6 },
  flex: { flex: 1, gap: 5 },
  tagRow: { flexDirection: "row", alignItems: "center", gap: 8 },
});
