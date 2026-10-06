import { loadPrivacy, type AccessCardVM } from "@vitallink/api";
import type { ColorToken } from "@vitallink/tokens";
import { tokenVar } from "../components/Icon";
import { Button, Chip } from "../components/ui";
import { useScreen } from "../data";
import { ScreenState } from "./ScreenState";
import s from "./Privacy.module.css";

export const TONE: Record<AccessCardVM["tone"], { bg: ColorToken; value: ColorToken }> = {
  default: { bg: "bgSurface", value: "textPrimary" },
  brand: { bg: "bgBrandSubtle", value: "textBrand" },
  critical: { bg: "bgCriticalSubtle", value: "textEnergy" },
  warning: { bg: "rangeBorderlineBg", value: "rangeBorderline" },
};

export function Privacy() {
  const state = useScreen(loadPrivacy);
  if (state.status !== "ready") return <ScreenState state={state} />;
  const p = state.data;

  return (
    <>
      <header className={s.heading}>
        <h1 className="vl-h1">Privacy Centre</h1>
        <p className="vl-body-l" style={{ color: tokenVar("textSecondary") }}>
          Who can see your health record, what they looked at, and how to revoke it.
        </p>
      </header>

      <div className={s.cards}>
        {p.cards.map((c) => (
          <section key={c.key} className={s.card} style={{ background: tokenVar(TONE[c.tone].bg) }} aria-label={c.label}>
            <span className="vl-label-m" style={{ color: tokenVar("textSecondary") }}>
              {c.label}
            </span>
            <span className="vl-metric-l" style={{ color: tokenVar(TONE[c.tone].value) }}>
              {c.value}
            </span>
            <span className="vl-caption" style={{ color: tokenVar("textTertiary") }}>
              {c.caption}
            </span>
            <Button variant="secondary" size="sm" className={s.manage}>
              Manage
            </Button>
          </section>
        ))}
      </div>

      <h2 className="vl-h3">Data access history</h2>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Entity</th>
              <th scope="col" className={s.cAccessed}>Accessed</th>
              <th scope="col" className={s.cPurpose}>Purpose</th>
              <th scope="col" className={s.cWhen}>Date &amp; time</th>
              <th scope="col" className={s.cStatus}>Status</th>
              <th scope="col" className={s.cAction}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {p.log.map((r, i) => (
              <tr key={i} className={r.status.fg === "rangeHigh" ? s.blocked : undefined}>
                <th scope="row">
                  <div className={s.entity}>
                    <span className={s.who}>{r.who}</span>
                    <span className="vl-caption" style={{ color: tokenVar("textTertiary") }}>
                      {r.detail}
                    </span>
                  </div>
                </th>
                <td>{r.accessed}</td>
                <td>{r.purpose}</td>
                <td>{r.when}</td>
                <td>
                  <Chip chip={r.status} dot />
                </td>
                <td className={s.cAction}>
                  <Button variant="secondary" size="sm">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
