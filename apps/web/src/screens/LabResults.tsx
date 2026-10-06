// Lab Results — Desktop 1440 (Figma 61:53).
import { loadLabResults } from "@vitallink/api";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenVar } from "../components/Icon";
import { Action, NotDesigned, PageHeader, PillTabs, TintCard, Txt } from "../components/kit";
import { Chip } from "../components/ui";
import { useScreen } from "../data";
import { ScreenState } from "./ScreenState";
import t from "../components/Table.module.css";
import k from "./Lists.module.css";

const PANELS = ["CBC", "Lipid Profile", "Liver", "Kidney", "Glucose", "Thyroid", "Other"];
const COLS = [426, 110, 90, 150, 130, 110, 100];

export function LabResults() {
  const { panel } = useParams();
  const state = useScreen(useCallback((api) => loadLabResults(api, panel), [panel]));
  const [tab, setTab] = useState(PANELS[0]);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const v = state.data;

  return (
    <>
      <PageHeader
        title="Lab Results"
        subtitle={v.subtitle}
        actions={
          <>
            <Action>Export</Action>
            <Action primary>Share with Doctor</Action>
          </>
        }
      />
      <PillTabs label="Lab panels" tabs={PANELS} value={tab} onChange={setTab} />
      {tab !== PANELS[0] ? (
        <NotDesigned what={`The ${tab} panel`} />
      ) : (
        <>
          <div className={k.tints}>
            {v.tints.map((x) => (
              <TintCard key={x.key} label={x.label} value={x.value} bg={x.bg} fg={x.fg} />
            ))}
          </div>
          <div className={t.wrap}>
            <table className={t.table}>
              <colgroup>
                {COLS.map((w, i) => (
                  <col key={i} style={{ width: w }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Test</th>
                  <th scope="col">Result</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Reference range</th>
                  <th scope="col">Status</th>
                  <th scope="col">Previous</th>
                  <th scope="col">Trend</th>
                </tr>
              </thead>
              <tbody>
                {v.rows.map((r) => (
                  <tr key={r.name} style={r.rowBg ? { background: tokenVar(r.rowBg) } : undefined}>
                    <th scope="row"><Txt s="bodyMStrong">{r.name}</Txt></th>
                    <td><Txt s="numeric" c={r.valueColor}>{r.value}</Txt></td>
                    <td><Txt s="table" c="textTertiary">{r.unit}</Txt></td>
                    <td><Txt s="numeric" c="textTertiary">{r.range}</Txt></td>
                    <td><Chip chip={r.status} dot /></td>
                    <td><Txt s="numeric" c="textTertiary">{r.previous}</Txt></td>
                    <td>
                      <Txt s="bodyMStrong" title={r.trendLabel}>
                        <span aria-hidden>{r.trend}</span>
                        <span className="sr-only">{r.trendLabel}</span>
                      </Txt>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={t.foot}>
              <Txt s="caption" c="textTertiary" as="p">
                Reference ranges vary by laboratory and by patient. Results are for your information and do not replace discussion with your clinician.
              </Txt>
            </div>
          </div>
        </>
      )}
    </>
  );
}
