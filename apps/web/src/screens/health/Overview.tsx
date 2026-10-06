// My Health · Overview — Desktop 1440 (Figma 77:512).
import { loadHealthOverview } from "@vitallink/api";
import { Rings } from "../../components/Charts";
import { CardGrid, HeadLink, Insight, Panel, Split, Txt } from "../../components/kit";
import { AccentDot, MetricCard } from "../../components/ui";
import { useScreen } from "../../data";
import { ScreenState } from "../ScreenState";
import { HealthPage } from "./HealthPage";
import s from "./health.module.css";

// "View all" opens the tab that covers each section.
const SECTION_TAB: Record<string, string> = {
  "Activity & movement": "/health/activity",
  "Heart & circulation": "/health/heart",
  "Respiratory & body": "/health/respiratory",
  "Sleep & digital wellbeing": "/health/sleep",
};

export function HealthOverview() {
  const state = useScreen(loadHealthOverview);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <HealthPage subtitle={v.subtitle}>
      <Split
        rail={
          <>
            <Panel title="Data sources" level="h5" gap={12}>
              <ul className={s.sources}>
                {v.sources.map((x) => (
                  <li key={x.name} className={s.source}>
                    <AccentDot color={x.color} />
                    <span>
                      <Txt s="bodySStrong">{x.name}</Txt>
                      <Txt s="caption" c="textTertiary">{x.data}</Txt>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Insights" level="h5" gap={12}>
              {v.insights.map((i) => (
                <Insight key={i.text} color={i.color}>{i.text}</Insight>
              ))}
              <Txt s="caption" c="textTertiary" as="p">Insights are generated from your own data and are not a medical diagnosis.</Txt>
            </Panel>
          </>
        }
      >
        <section className={s.today} aria-label="Today's movement">
          <Rings rings={v.rings.map((r) => ({ fraction: r.fraction, color: r.color, label: r.label }))} />
          <div className={s.ringStats}>
            <Txt s="h3" c="textInverse" as="h2">Today's movement</Txt>
            <div className={s.ringRow}>
              {v.rings.map((r) => (
                <div key={r.label} className={s.ring}>
                  <Txt s="overline" c={r.color}>{r.label}</Txt>
                  <span className={s.valueRow}>
                    <Txt s="metricL" c="textInverse">{r.value}</Txt>
                    <Txt s="bodyS" c="textTertiary">{r.goal}</Txt>
                  </span>
                </div>
              ))}
            </div>
            <Txt s="caption" c="textTertiary">{v.ringsSource}</Txt>
          </div>
        </section>
        {v.sections.map((sec) => (
          <section key={sec.title} className={s.section} aria-label={sec.title}>
            <div className={s.sectionHead}>
              <Txt s="h3" as="h2">{sec.title}</Txt>
              <Txt s="caption" c="textTertiary">{sec.sources}</Txt>
              <HeadLink href={SECTION_TAB[sec.title]}>View all</HeadLink>
            </div>
            <CardGrid width={228}>
              {sec.cards.map((m) => (
                <MetricCard key={m.key} m={m} />
              ))}
            </CardGrid>
          </section>
        ))}
      </Split>
    </HealthPage>
  );
}
