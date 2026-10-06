// My Health · Mental Wellbeing — Desktop 1440 (Figma 142:2090).
import { loadMental } from "@vitallink/api";
import { tokenVar } from "../../components/Icon";
import { CardGrid, Insight, KeyValues, Panel, Split, StatCard, Txt } from "../../components/kit";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";
import s from "./health.module.css";

export function Mental() {
  const state = useScreen(loadMental);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle="Mood, mindfulness and the signals that move with them">
      <Split
        rail={
          <>
            <Panel title="Mindfulness" level="h5" gap={12}>
              <KeyValues rows={v.mindful} />
            </Panel>
            <Panel title="Patterns worth noticing" level="h5" gap={12}>
              {v.insights.map((i) => (
                <Insight key={i.text} color={i.color}>{i.text}</Insight>
              ))}
              <Txt s="caption" c="textTertiary" as="p">
                These are associations in your own data, not a mental health assessment. If you are struggling, speak to a professional.
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
        <Panel title="How you have felt this week" caption="Self-reported once a day · tap a day to add a note" gap={14}>
          <div className={s.mood}>
            {v.days.map((d) => (
              <div key={d.label} aria-label={`${d.label}: ${d.mood}`}>
                <span className={s.level} style={{ background: tokenVar(d.color) }} />
                <Txt s="labelM">{d.label}</Txt>
                <Txt s="caption" c="textTertiary">{d.mood}</Txt>
              </div>
            ))}
          </div>
        </Panel>
      </Split>
    </HealthPage>
  );
}
