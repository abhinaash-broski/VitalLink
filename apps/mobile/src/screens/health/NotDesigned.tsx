// Health tabs with no mobile frame yet (Sleep, Heart, Body): header and chips
// stay so the user can move on; the body says what is missing.
import { Text } from "react-native";
import { HealthChips } from "../../components/HealthChips";
import { Screen } from "../../components/kit";
import { t } from "../../theme";

export function HealthNotDesigned({ tab }: { tab: string }) {
  return (
    <Screen title={tab} subtitle="My Health" add chips={<HealthChips active={tab} />}>
      <Text style={t("bodyM", "textTertiary")}>The mobile {tab.toLowerCase()} screen is in a later batch. It is available on the web portal.</Text>
    </Screen>
  );
}
