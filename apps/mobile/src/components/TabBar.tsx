import type { BottomTabBarProps } from "expo-router/tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { c, t } from "../theme";
import { Icon, type IconName } from "./Icon";

const ICON: Record<string, IconName> = {
  index: "home-22",
  health: "health-22",
  train: "dumbbell-22",
  records: "records-22",
  profile: "user-22",
};

// Figma tab bar: 72 tall, surface, top border, 22px icons over Label/Small.
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[st.bar, { paddingBottom: Math.max(insets.bottom, 0) }]}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const label = descriptors[route.key].options.title ?? route.name;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
            style={st.item}
            onPress={() => {
              const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
              if (!focused && !e.defaultPrevented) navigation.navigate(route.name, route.params);
            }}
          >
            <Icon name={ICON[route.name] ?? "home-22"} color={focused ? "iconBrand" : "textTertiary"} />
            <Text style={t("labelS", focused ? "textBrand" : "textTertiary")}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const st = StyleSheet.create({
  bar: { flexDirection: "row", backgroundColor: c.bgSurface, borderTopWidth: 1, borderTopColor: c.borderSubtle },
  item: { flex: 1, height: 72, alignItems: "center", justifyContent: "center", gap: 6 },
});
