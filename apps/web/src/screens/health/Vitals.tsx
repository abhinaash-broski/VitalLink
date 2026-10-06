// My Health · Vitals — Desktop 1440 (Figma 142:1340).
import { loadVitals } from "@vitallink/api";
import { LineChart } from "../../components/Charts";
import { CardGrid, KeyValues, Legend, Panel, Split, StatCard, Txt } from "../../components/kit";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";

export function Vitals() {
  const state = useScreen(loadVitals);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle={v.subtitle}>
      <Split
        rail={
          <>
            <Panel title="Latest measurements" level="h5" gap={12}>
              <KeyValues rows={v.latest} />
            </Panel>
            <Panel title="Measurement sources" level="h5" gap={12}>
              <KeyValues rows={v.sources} />
              <Txt s="caption" c="textTertiary" as="p">All readings are timestamped and attributed to the device that produced them.</Txt>
            </Panel>
          </>
        }
      >
        <CardGrid width={224}>
          {v.stats.map((st) => (
            <StatCard key={st.key} stat={st} />
          ))}
        </CardGrid>
        <Panel title="Blood pressure over 30 days" caption="Systolic and diastolic, mmHg · healthy band shaded" gap={16}>
          <LineChart label="Blood pressure over 30 days" series={v.bp.series} band={v.bp.band} />
          <Legend items={v.bp.legend} />
        </Panel>
      </Split>
    </HealthPage>
  );
}
