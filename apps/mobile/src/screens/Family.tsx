// Family — Mobile 390 (Figma 151:226).
import { loadFamily } from "@vitallink/api";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../components/Icon";
import { Avatar, Row, Screen, Section, Tag } from "../components/kit";
import { ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { c, t } from "../theme";

export function FamilyScreen() {
  const state = useScreen(loadFamily);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;
  const view = v.viewing;

  return (
    <Screen title="Family" subtitle={v.shortSubtitle} back="/profile">
      {view && (
        <View style={st.viewing}>
          <Avatar initials={view.person.initials} tone={view.person.tone} size={38} />
          <View style={st.flex}>
            <Text style={t("bodyMStrong", "textBrand")}>{view.title}</Text>
            <Text style={t("caption", "textSecondary")}>{view.shortDetail}</Text>
          </View>
        </View>
      )}
      <Section title="Profiles" gap={8}>
        {v.members.map((m) => (
          <Row key={m.id} pad={10} style={st.gap11}>
            <Avatar initials={m.initials} tone={m.tone} size={30} />
            <View style={st.flex}>
              <Text style={t("bodySStrong", "textPrimary")}>{m.name}</Text>
              <Text style={t("caption", "textTertiary")}>{m.caption}</Text>
            </View>
            <Icon name="chevron-right-16" color="iconSubtle" />
          </Row>
        ))}
      </Section>
      {view && (
        <Section title="What you can see" gap={8}>
          {view.access.map((a) => (
            <View key={a.label} style={st.access}>
              <Text style={[t("bodyS", a.granted ? "textPrimary" : "textTertiary"), st.flex]}>{a.shortLabel}</Text>
              <Tag chip={a.granted ? { label: "Granted", fg: "goalAchieved", bg: "rangeNormalBg" } : { label: "Not shared", fg: "textTertiary", bg: "bgSubtle" }} />
            </View>
          ))}
        </Section>
      )}
    </Screen>
  );
}

const st = StyleSheet.create({
  viewing: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: c.borderBrand, backgroundColor: c.bgBrandSubtle },
  flex: { flex: 1, gap: 1 },
  gap11: { gap: 11 },
  access: { flexDirection: "row", alignItems: "center", gap: 8 },
});
