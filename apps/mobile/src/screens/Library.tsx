// Health Library — Mobile 390 (Figma 151:412).
import { loadLibrary } from "@vitallink/api";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Icon } from "../components/Icon";
import { ChipRow, Row, Screen, Section, Tag } from "../components/kit";
import { ScreenState } from "../components/ui";
import { useScreen } from "../data";
import { c, t } from "../theme";

// Chips map onto article categories ("Training" is the Fitness category).
const CHIPS: { label: string; categories: string[] | null }[] = [
  { label: "All", categories: null },
  { label: "Training", categories: ["FITNESS", "TRAINING"] },
  { label: "Nutrition", categories: ["NUTRITION"] },
  { label: "Sleep", categories: ["SLEEP"] },
  { label: "Heart", categories: ["HEART"] },
];

export function LibraryScreen() {
  const state = useScreen(loadLibrary);
  const [chip, setChip] = useState("All");
  const [query, setQuery] = useState("");
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;
  const cats = CHIPS.find((x) => x.label === chip)?.categories ?? null;
  const q = query.trim().toLowerCase();
  const articles = v.trendingMobile.filter((a) => (!cats || cats.includes(a.tag.label)) && (!q || a.title.toLowerCase().includes(q)));

  return (
    <Screen title="Health Library" subtitle="Clinically reviewed guidance" back="/profile" chips={<ChipRow label="Topics" options={CHIPS.map((x) => x.label)} value={chip} onChange={setChip} />}>
      <View style={st.search}>
        <Icon name="search-17" color="iconSubtle" />
        <TextInput style={[t("bodyM", "textPrimary"), st.flex]} placeholder="Search health topics" placeholderTextColor={c.textPlaceholder} value={query} onChangeText={setQuery} accessibilityLabel="Search health topics" />
      </View>
      <View style={st.featured} accessibilityLabel={`Featured: ${v.featuredMobile.title}`}>
        <Text style={t("labelS", "textBrand")}>{v.featuredMobile.overline}</Text>
        <Text style={t("h4", "textInverse")}>{v.featuredMobile.title}</Text>
        <Text style={t("caption", "textTertiary")}>{v.featuredMobile.meta}</Text>
      </View>
      <Section title="Trending topics" gap={8}>
        {articles.length === 0 && <Text style={t("bodyS", "textTertiary")}>No topics match.</Text>}
        {articles.map((a) => (
          <Row key={a.id} pad={11} style={st.article}>
            <Tag chip={a.tag} />
            <Text style={t("bodySStrong", "textPrimary")}>{a.title}</Text>
            <Text style={t("caption", "textTertiary")}>{a.shortMeta}</Text>
          </Row>
        ))}
      </Section>
    </Screen>
  );
}

const st = StyleSheet.create({
  search: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: c.borderDefault, backgroundColor: c.bgSurface },
  flex: { flex: 1, padding: 0 },
  featured: { gap: 10, paddingVertical: 20, paddingHorizontal: 18, borderRadius: 16, backgroundColor: c.bgInverse },
  article: { flexDirection: "column", alignItems: "flex-start", gap: 6 },
});
