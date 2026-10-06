// Welcome — Mobile 390 (Figma 146:2).
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { Button } from "../components/ui";
import { c, t } from "../theme";

// Shown before sign-in, so these are illustrative sample values from the design, not user data.
const PREVIEW = [
  { label: "Sessions", value: "4" },
  { label: "Steps", value: "8,412" },
  { label: "Sleep", value: "7h 12m" },
];

export function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[st.screen, { paddingTop: insets.top + 64, paddingBottom: insets.bottom + 40 }]}>
      <View style={st.top}>
        <View style={st.logo}>
          <View style={st.mark}>
            <Icon name="health-17" color="textOnBrand" size={20} />
          </View>
          <Text style={t("h4", "textInverse")}>VitalLink</Text>
        </View>
        <Text style={t("displayM", "textInverse")}>Your Health.{"\n"}Your Fitness.{"\n"}Your Progress.</Text>
        <Text style={t("bodyL", "textSecondary")}>Track training, vitals and recovery in one place — and see how they move together.</Text>
      </View>
      <View style={st.spacer} />
      <View style={st.preview} accessibilityElementsHidden>
        {PREVIEW.map((x) => (
          <View key={x.label} style={st.tile}>
            <Text style={t("metricM", "textInverse")}>{x.value}</Text>
            <Text style={t("caption", "textInverse")}>{x.label}</Text>
          </View>
        ))}
      </View>
      <View style={st.buttons}>
        <Button label="Create Account" onPress={() => router.push("/create-account")} />
        <Button label="Sign In" variant="inverse" onPress={() => router.push("/sign-in")} />
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24, backgroundColor: c.bgInverse },
  top: { gap: 22 },
  logo: { flexDirection: "row", alignItems: "center", gap: 11 },
  mark: { width: 34, height: 34, borderRadius: 10, backgroundColor: c.bgBrand, alignItems: "center", justifyContent: "center" },
  spacer: { flex: 1 },
  preview: { flexDirection: "row", gap: 10, marginBottom: 28 },
  tile: { flex: 1, gap: 4, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: c.borderStrong },
  buttons: { gap: 10 },
});
