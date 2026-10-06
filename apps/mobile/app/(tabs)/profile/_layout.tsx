import { Stack } from "expo-router";
import { c } from "../../../src/theme";

export default function ProfileStack() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bgCanvas } }} />;
}
