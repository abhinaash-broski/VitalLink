// Messages — Mobile 390 (Figma 151:67). Conversation threads have no mobile frame yet.
import { loadMessages } from "@vitallink/api";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Row, Screen, Section } from "../components/kit";
import { Dot, ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { t } from "../theme";

export function MessagesScreen() {
  const state = useScreen(loadMessages);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <Screen title="Messages" subtitle={v.shortSubtitle} back="/profile">
      <Section title="Conversations" gap={8}>
        {v.mobileOrder.map((m) => (
          <Row key={m.id} pad={12} style={st.row}>
            <Avatar initials={m.initials} tone={m.tone} size={36} />
            <View style={st.flex}>
              <View style={st.top}>
                <Text style={[t("bodySStrong", "textPrimary"), st.flex]}>{m.name}</Text>
                {m.unread && <Dot color="bgBrand" size={7} />}
                <Text style={t("caption", "textTertiary")}>{m.when}</Text>
              </View>
              <Text style={t("caption", "textTertiary")}>{m.role.split(" · ")[0]}</Text>
              <Text style={t("caption", m.unread ? "textPrimary" : "textSecondary")} numberOfLines={2}>{m.preview}</Text>
            </View>
          </Row>
        ))}
      </Section>
    </Screen>
  );
}

const st = StyleSheet.create({
  row: { alignItems: "flex-start" },
  flex: { flex: 1, gap: 2 },
  top: { flexDirection: "row", alignItems: "center", gap: 6 },
});
