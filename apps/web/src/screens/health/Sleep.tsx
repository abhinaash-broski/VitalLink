// My Health · Sleep — Desktop 1440 (Figma 133:1142).
import { loadSleep } from "@vitallink/api";
import { StackedBars } from "../../components/Charts";
import { Insight, KeyValues, Legend, Panel, Split, StatRow, Txt } from "../../components/kit";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";
import s from "./health.module.css";

export function Sleep() {
  const state = useScreen(loadSleep);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle="Duration, stages and consistency · Apple Watch">
      <Split
        rail={
          <>
            <Panel title="Sleep consistency" level="h5" gap={12}>
              <KeyValues rows={v.consistency} />
            </Panel>
            <Panel title="What is affecting it" level="h5" gap={12}>
              {v.insights.map((i) => (
                <Insight key={i.text} color={i.color}>{i.text}</Insight>
              ))}
            </Panel>
          </>
        }
      >
        <Panel gap={16}>
          <div className={s.chartHead}>
            <Txt s="h3" as="h2">Last night</Txt>
            <p className={s.headline}>
              <Txt s="metricXl">{v.headline}</Txt>
              <Txt s="bodyM" c={v.detailColor}>{v.detail}</Txt>
            </p>
          </div>
          {/* Stages: 0.34 px per minute, 2px apart (plot 133:1142). */}
          <StackedBars label="Sleep stages" scale={0.34} radius={4} days={v.days} />
          <Legend items={v.legend} />
        </Panel>
        <StatRow stats={v.stats} />
      </Split>
    </HealthPage>
  );
}
