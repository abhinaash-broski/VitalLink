import { loadDashboard } from "@vitallink/api";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon, tokenVar } from "../components/Icon";
import { AccentDot, Button, Chip, Logo } from "../components/ui";
import { useScreen } from "../data";
import s from "./SignIn.module.css";

// Brand-panel preview card shows the sample dashboard values (design data in mock mode).
function Preview() {
  const state = useScreen(loadDashboard);
  if (state.status !== "ready") return null;
  const d = state.data;
  const pick = ["heart_rate", "blood_pressure", "oxygen_saturation"];
  const tiles = d.metrics.filter((m) => pick.includes(m.key));
  return (
    <div className={s.preview} aria-hidden>
      <div className={s.previewHead}>
        <span className="vl-h5">Your health today</span>
        {d.score !== null && <Chip chip={{ label: `Score ${d.score} · ${d.scoreLabel}`, fg: "rangeNormal", bg: "rangeNormalBg" }} />}
      </div>
      <div className={s.tiles}>
        {tiles.map((m) => (
          <div key={m.key} className={s.tile}>
            <span className={s.tileLabel}>
              <AccentDot color={m.accent} size={6} />
              {m.key === "oxygen_saturation" ? "Oxygen" : m.label}
            </span>
            <span className={s.tileValue}>
              <span className="vl-metric-m">{m.value}</span>
              <span className="vl-caption" style={{ color: tokenVar("textTertiary") }}>
                {m.unit}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignIn() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  // Real sign-in goes through Supabase Auth (see backend design); the mock build just enters the app.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    nav("/");
  };

  return (
    <div className={s.page}>
      <aside className={s.brand}>
        <Logo large inverse />
        <div className={s.pitch}>
          <h1 className="vl-display-m" style={{ color: tokenVar("textInverse") }}>
            One secure place for your health.
          </h1>
          <p className="vl-body-l" style={{ color: tokenVar("textSecondary") }}>
            Track your training and vitals, keep your medical records together, and see how the two affect each other over
            time.
          </p>
          <Preview />
        </div>
        <ul className={s.trust}>
          {["HIPAA-aligned", "End-to-end encrypted", "You control access"].map((t) => (
            <li key={t}>
              <AccentDot color="rangeNormal" size={6} />
              {t}
            </li>
          ))}
        </ul>
      </aside>

      <main className={s.formWrap}>
        <form className={s.form} onSubmit={submit}>
          <header className={s.formHead}>
            <h2 className="vl-h1">Welcome back</h2>
            <p className="vl-body-l" style={{ color: tokenVar("textSecondary") }}>
              Sign in to your VitalLink account.
            </p>
          </header>

          <label className={s.field}>
            <span className={s.label}>Email or phone</span>
            <input className={s.input} name="email" autoComplete="username" defaultValue="alex.carter@email.com" />
          </label>

          <label className={s.field}>
            <span className={s.label}>Password</span>
            <span className={s.inputWrap}>
              <input
                className={s.input}
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                defaultValue="correcthorse"
              />
              <button type="button" className={s.show} onClick={() => setShow((v) => !v)} aria-pressed={show}>
                {show ? "Hide" : "Show"}
                <Icon name="eye-17" color="iconSubtle" />
              </button>
            </span>
          </label>

          <div className={s.row}>
            <label className={s.check}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className={s.box} aria-hidden />
              Remember me
            </label>
            <a className={s.link} href="#forgot">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="block">
            Sign In
          </Button>

          <div className={s.or}>
            <span>or</span>
          </div>

          <div className={s.social}>
            <Button variant="secondary" size="block">
              <Icon name="user-17" color="iconDefault" />
              Continue with Google
            </Button>
            <Button variant="secondary" size="block">
              <Icon name="user-17" color="iconDefault" />
              Continue with Apple
            </Button>
          </div>

          <p className={s.footer}>
            New to VitalLink? <Link className={s.link} to="/create-account">Create Account</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
