// Health tab chips (Categories in 86:56 / 87:188 / 87:374). Each chip is a route in
// the health stack; tabs without a mobile frame show a placeholder.
import { useRouter } from "expo-router";
import { ChipRow } from "./kit";

export const HEALTH_CHIPS: { label: string; href: string }[] = [
  { label: "Overview", href: "/health" },
  { label: "Activity", href: "/health/activity" },
  { label: "Sleep", href: "/health/sleep" },
  { label: "Heart", href: "/health/heart" },
  { label: "Digital", href: "/health/digital" },
  { label: "Body", href: "/health/body" },
];

export function HealthChips({ active }: { active: string }) {
  const router = useRouter();
  return (
    <ChipRow
      label="Health categories"
      options={HEALTH_CHIPS.map((c) => c.label)}
      value={active}
      onChange={(label) => {
        const to = HEALTH_CHIPS.find((c) => c.label === label);
        if (to && label !== active) router.replace(to.href as never);
      }}
    />
  );
}
