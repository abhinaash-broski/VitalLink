// My Health · Respiratory — Desktop 1440 (Figma 142:1733).
import { loadRespiratory } from "@vitallink/api";
import { LineChart } from "../../components/Charts";
import { CardGrid, KeyValues, Legend, Panel, Split, StatCard, Txt } from "../../components/kit";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";

export function Respiratory() {
  const state = useScreen(loadRespiratory);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle="Oxygen saturation, breathing rate and aerobic capacity">
      <Split
        rail={
          <>
            <Panel title="Aerobic capacity" level="h5" gap={12}>
              <KeyValues rows={v.aerobic} />
              <Txt s="caption" c="textTertiary" as="p">
                VO₂max is estimated from heart rate during outdoor walks and runs. It is not a clinical lung function test.
              </Txt>
            </Panel>
            <Panel title="Notifications" level="h5" gap={12}>
              <KeyValues rows={v.alerts} />
              <Txt s="caption" c="textTertiary" as="p">
                VitalLink is not a medical device. Persistent breathlessness should be discussed with a clinician.
              </Txt>
            </Panel>
          </>
        }
      >
        <CardGrid width={224}>
          {v.stats.map((st) => (
            <StatCard key={st.key} stat={st} />
          ))}
        </CardGrid>
        <Panel title="Blood oxygen overnight" caption="Percentage saturation across last night · 95% and above is typical" gap={16}>
          <LineChart label="Blood oxygen overnight" series={v.chart.series} band={v.chart.band} />
          <Legend items={v.chart.legend} />
        </Panel>
      </Split>
    </HealthPage>
  );
}
