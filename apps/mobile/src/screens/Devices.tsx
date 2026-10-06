// Connected Devices — Mobile 390 (Figma 151:752).
import { loadDevices, type DeviceVM } from "@vitallink/api";
import { StyleSheet, Text, View } from "react-native";
import type { IconName } from "../components/Icon";
import { Pill, Screen, Section, Tile } from "../components/kit";
import { ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { t } from "../theme";

const ICON: Record<DeviceVM["icon"], IconName> = {
  devices: "devices-18",
  monitor: "monitor-18",
  droplet: "droplet-18",
  scale: "scale-18",
  health: "health-18",
};

export function DevicesScreen() {
  const state = useScreen(loadDevices);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <Screen title="Connected Devices" subtitle={v.shortSubtitle} back="/profile">
      {v.devices.map((d) => (
        <Section key={d.id} gap={10}>
          <View style={st.top}>
            <Tile icon={ICON[d.icon]} size={36} radius={10} />
            <View style={st.flex}>
              <Text style={t("bodySStrong", "textPrimary")}>{d.name}</Text>
              <Text style={t("caption", "textTertiary")}>{d.caption}</Text>
            </View>
            <Pill chip={d.status} />
          </View>
          <Text style={t("caption", "textSecondary")}>{d.shortData}</Text>
        </Section>
      ))}
    </Screen>
  );
}

const st = StyleSheet.create({
  top: { flexDirection: "row", alignItems: "center", gap: 11 },
  flex: { flex: 1, gap: 2 },
});
