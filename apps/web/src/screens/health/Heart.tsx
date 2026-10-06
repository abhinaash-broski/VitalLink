// My Health · Heart — Desktop 1440 (Figma 133:1543).
import { loadHeart } from "@vitallink/api";
import { LineChart } from "../../components/Charts";
import { KeyValues, Legend, Panel, Split, StatRow, Track, Txt } from "../../components/kit";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";
import s from "./health.module.css";

export function Heart() {
  const state = useScreen(loadHeart);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle="Resting rate, variability and cardio fitness · Apple Watch">
      <Split
        rail={
          <Panel title="Heart notifications" level="h5" gap={12}>
            <KeyValues rows={v.alerts} />
            <Txt s="caption" c="textTertiary" as="p">
              VitalLink is not a medical device and does not detect heart conditions. Discuss any concern with a clinician.
            </Txt>
          </Panel>
        }
      >
        <Panel gap={16}>
          <div className={s.chartHead}>
            <Txt s="h3" as="h2">Resting heart rate</Txt>
            <p className={s.headline}>
              <Txt s="metricXl">{v.value}</Txt>
              <Txt s="h4" c="textTertiary">BPM</Txt>
              <Txt s="bodyM" c="goalAchieved">{v.detail}</Txt>
            </p>
          </div>
          <LineChart label="Resting heart rate trend" series={v.chart.series} band={v.chart.band} />
          <Legend items={v.chart.legend} />
        </Panel>
        <StatRow stats={v.stats} />
        <Panel title="Time in heart-rate zones this week" gap={14}>
          {v.zones.map((z) => (
            <div key={z.key} className={s.zone}>
              <div className={s.zoneHead}>
                <Txt s="bodySStrong">{z.label}</Txt>
                <Txt s="caption" c="textTertiary">{z.range}</Txt>
                <Txt s="bodySStrong">{z.time}</Txt>
              </div>
              <Track fraction={z.fraction} color={z.color} label={z.label} />
            </div>
          ))}
        </Panel>
      </Split>
    </HealthPage>
  );
}
