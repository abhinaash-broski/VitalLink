import { Stack } from "expo-router";
import { c } from "../../../src/theme";

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false, animation: "none", contentStyle: { backgroundColor: c.bgCanvas } }} />;
}
