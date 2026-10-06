// Profile — Mobile 390 (Figma 145:88). The menu counts come from the same
// view-models as each destination screen.
import { loadAppointments, loadDevices, loadFamily, loadMedications, loadMessages, loadRecords, loadSettings, loadWorkouts, loadGoals, type VitalLinkClient } from "@vitallink/api";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, MenuRow, Screen, Section } from "../components/kit";
import { ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { c, shadow, t } from "../theme";

// Loaders that are only "not available yet" leave their count off rather than failing the page.
const soft = <T,>(p: Promise<T>) => p.catch(() => null);

async function loadProfile(api: VitalLinkClient) {
  const [settings, records, meds, appts, family, messages, devices, workouts, goals] = await Promise.all([
    loadSettings(api),
    soft(loadRecords(api)),
    soft(loadMedications(api)),
    soft(loadAppointments(api)),
    soft(loadFamily(api)),
    soft(loadMessages(api)),
    soft(loadDevices(api)),
    soft(loadWorkouts(api)),
    soft(loadGoals(api)),
  ]);
  return {
    settings,
    counts: {
      records: records ? String(records.total) : undefined,
      meds: meds ? `${meds.rows.length} active` : undefined,
      appts: appts ? appts.shortSubtitle.split(" · ")[0] : undefined,
      family: family ? family.shortSubtitle.split(" · ")[0] : undefined,
      messages: messages ? messages.shortSubtitle.split(" · ")[0] : undefined,
      devices: devices ? devices.shortSubtitle.split(" · ")[0] : undefined,
    },
    summary: [
      { label: "Workouts", value: workouts?.lifetime ?? "—", color: "fitnessStrength" as const },
      { label: "Day streak", value: workouts?.mobileStats.find((s) => s.key === "streak")?.value ?? "—", color: "goalAchieved" as const },
      { label: "Goals met", value: goals?.mobileStats.find((s) => s.key === "achieved")?.value ?? "—", color: "goalOnTrack" as const },
    ],
  };
}

export function ProfileScreen() {
  const state = useScreen(loadProfile);
  const router = useRouter();
  if (state.status !== "ready") return <ScreenState state={state} />;
  const { settings: s, counts, summary } = state.data;
  const go = (href: string) => () => router.push(href as never);

  return (
    <Screen title="Profile" subtitle="Account, privacy and everything else" add>
      <View style={[st.card, st.identity]}>
        <Avatar initials={s.person.initials} tone={s.person.tone} size={56} />
        <View style={st.flex}>
          <Text style={t("h4", "textPrimary")}>{s.person.name}</Text>
          <Text style={t("caption", "textTertiary")}>{s.email}</Text>
          <Text style={t("caption", "textTertiary")}>{s.memberSince}</Text>
        </View>
      </View>

      <View style={st.summary}>
        {summary.map((x) => (
          <View key={x.label} style={[st.card, st.tile]} accessibilityLabel={`${x.label}: ${x.value}`}>
            <Text style={t("metricM", x.color)}>{x.value}</Text>
            <Text style={t("caption", "textTertiary")}>{x.label}</Text>
          </View>
        ))}
      </View>

      <Section gap={6}>
        <Text style={t("labelS", "textTertiary")}>Health &amp; records</Text>
        <MenuRow icon="records-16" label="Medical Records" value={counts.records} onPress={() => router.navigate("/records" as never)} />
        <MenuRow icon="medications-16" label="Medications" value={counts.meds} onPress={go("/profile/medications")} />
        <MenuRow icon="appointments-16" label="Appointments" value={counts.appts} onPress={go("/profile/appointments")} />
        <MenuRow icon="emergency-16" iconColor="iconEnergy" label="Emergency Medical ID" onPress={go("/profile/emergency")} />
        {/* Nutrition and Goals have mobile frames but no entry point in the design; listed here. */}
        <MenuRow icon="nutrition-16" label="Nutrition" onPress={() => router.navigate("/train/nutrition" as never)} />
        <MenuRow icon="goals-16" label="Goals" onPress={() => router.navigate("/train/goals" as never)} />
      </Section>

      <Section gap={6}>
        <Text style={t("labelS", "textTertiary")}>People &amp; messages</Text>
        <MenuRow icon="family-16" label="Family" value={counts.family} onPress={go("/profile/family")} />
        <MenuRow icon="messages-16" label="Messages" value={counts.messages} onPress={go("/profile/messages")} />
        <MenuRow icon="library-16" label="Health Library" onPress={go("/profile/library")} />
      </Section>

      <Section gap={6}>
        <Text style={t("labelS", "textTertiary")}>Account</Text>
        <MenuRow icon="devices-16" label="Connected Devices" value={counts.devices} onPress={go("/profile/devices")} />
        <MenuRow icon="notifications-16" label="Notifications" onPress={go("/profile/notifications")} />
        <MenuRow icon="privacy-16" label="Privacy" onPress={go("/profile/privacy")} />
        <MenuRow icon="settings-16" label="Settings" onPress={go("/profile/settings")} />
      </Section>
    </Screen>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: c.bgSurface, borderWidth: 1, borderColor: c.borderSubtle, borderRadius: 12, ...shadow.card },
  identity: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  flex: { flex: 1, gap: 3 },
  summary: { flexDirection: "row", gap: 12 },
  tile: { flex: 1, alignItems: "center", gap: 5, padding: 16 },
});
