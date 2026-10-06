import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApiProvider } from "../src/data";
import { c } from "../src/theme";

export default function RootLayout() {
  const [loaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, RobotoMono_400Regular });
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <ApiProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bgCanvas } }} />
      </ApiProvider>
    </SafeAreaProvider>
  );
}
