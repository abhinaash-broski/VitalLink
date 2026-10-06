import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { c, t } from "../theme";
import { Icon } from "./Icon";

/** Screen header from the mobile frames: surface, px16 py14, title + caption, optional back / trailing slot. */
export function Header({
  title,
  subtitle,
  titleStyle = "h3",
  onBack,
  trailing,
  children,
}: {
  title: string;
  subtitle?: string;
  titleStyle?: "h3" | "h4";
  onBack?: () => void;
  trailing?: ReactNode;
  children?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[st.wrap, { paddingTop: insets.top + 14 }]}>
      <View style={st.row}>
        {onBack && (
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={st.back}>
            <Icon name="chevron-left-17" color="iconDefault" />
          </Pressable>
        )}
        <View style={st.titles}>
          <Text style={t(titleStyle, "textPrimary")} accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? <Text style={t("caption", "textTertiary")}>{subtitle}</Text> : null}
        </View>
        {trailing}
      </View>
      {children}
    </View>
  );
}

const st = StyleSheet.create({
  wrap: {
    backgroundColor: c.bgSurface,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.borderSubtle,
    gap: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  titles: { flex: 1, gap: 2 },
  back: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.bgSubtle, alignItems: "center", justifyContent: "center" },
});
