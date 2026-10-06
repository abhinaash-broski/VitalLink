// Create Account — Desktop 1440 (Figma 26:2). Step 1 of 8; the other steps can be
// finished later, so Continue enters the app (sign-up itself is Supabase Auth, as sign-in).
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cx, Txt } from "../components/kit";
import { Logo } from "../components/ui";
import s from "./CreateAccount.module.css";

const STEPS = ["Account", "Personal Information", "Health Profile", "Body Metrics", "Medical Information", "Emergency Contact", "Privacy Preferences", "Finish"];

type Field = { key: string; label: string; type?: string; placeholder: string; help?: string; wide?: boolean; autoComplete?: string };

const FIELDS: Field[] = [
  { key: "first", label: "First name", placeholder: "Alex", autoComplete: "given-name" },
  { key: "last", label: "Last name", placeholder: "Carter", autoComplete: "family-name" },
  { key: "email", label: "Email address", type: "email", placeholder: "alex.carter@email.com", autoComplete: "email" },
  { key: "phone", label: "Mobile number", type: "tel", placeholder: "(214) 555-0148", autoComplete: "tel" },
  { key: "password", label: "Password", type: "password", placeholder: "", help: "At least 12 characters, one number and one symbol.", autoComplete: "new-password" },
  { key: "confirm", label: "Confirm password", type: "password", placeholder: "", autoComplete: "new-password" },
  { key: "zip", label: "ZIP code", placeholder: "75201", help: "Used to find clinics and facilities near you.", autoComplete: "postal-code" },
  { key: "dob", label: "Date of birth", placeholder: "MM / DD / YYYY", help: "Used to personalise training and health targets.", autoComplete: "bday" },
  { key: "height", label: "Height", placeholder: "178 cm", help: "Used to calculate BMI.", wide: true },
];

const strong = (p: string) => p.length >= 12 && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);

export function CreateAccount() {
  const nav = useNavigate();
  const [v, setV] = useState<Record<string, string>>({});
  const [terms, setTerms] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [research, setResearch] = useState(false);

  const pw = v.password ?? "";
  const matches = pw.length > 0 && pw === (v.confirm ?? "");
  const ready = !!(v.first && v.last && v.email && strong(pw) && matches && terms);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (ready) nav("/");
  };

  const help = (f: Field) => {
    if (f.key === "confirm") return matches ? "Both entries match." : v.confirm ? "Entries don't match yet." : "";
    return f.help;
  };

  return (
    <form className={s.page} onSubmit={submit}>
      <header className={s.header}>
        <Logo />
        <Txt s="bodyM" c="textSecondary">
          Already have an account?{" "}
          <Link to="/sign-in" className={cx("vl-body-m-strong", s.link)}>Sign In</Link>
        </Txt>
      </header>

      <ol className={s.stepper} aria-label="Sign-up steps">
        {STEPS.map((step, i) => (
          <li key={step} aria-current={i === 0 ? "step" : undefined}>
            <span className={s.track}>
              <span className={cx("vl-label-m", s.marker, i === 0 && s.markerOn)}>{i + 1}</span>
              {i < STEPS.length - 1 && <span className={s.connector} />}
            </span>
            <Txt s={i === 0 ? "labelL" : "bodyS"} c={i === 0 ? "textBrand" : "textTertiary"}>{step}</Txt>
          </li>
        ))}
      </ol>

      <main className={s.body}>
        <section className={s.card} aria-labelledby="create-title">
          <div className={s.heading}>
            <Txt s="overline" c="textBrand">STEP 1 OF {STEPS.length}</Txt>
            <Txt s="h2" as="h1"><span id="create-title">Create your account</span></Txt>
            <Txt s="bodyM" c="textSecondary" as="p">
              This is the only step you need to finish now. Health, training and emergency details can be added later.
            </Txt>
          </div>
          <div className={s.grid}>
            {FIELDS.map((f) => (
              <label key={f.key} className={cx(s.field, f.wide && s.wide)}>
                <Txt s="labelL">{f.label}</Txt>
                <input
                  className={cx("vl-body-m", s.input)}
                  type={f.type ?? "text"}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  value={v[f.key] ?? ""}
                  onChange={(e) => setV({ ...v, [f.key]: e.target.value })}
                  aria-invalid={f.key === "confirm" && !!v.confirm && !matches ? true : undefined}
                />
                {help(f) ? <Txt s="caption" c={f.key === "confirm" && v.confirm && !matches ? "textCritical" : "textTertiary"}>{help(f)}</Txt> : null}
              </label>
            ))}
          </div>
          <div className={s.consent}>
            <Check checked={terms} onChange={setTerms}>I agree to the VitalLink Terms of Service and Privacy Policy.</Check>
            <Check checked={reminders} onChange={setReminders}>Send me training reminders and goal alerts.</Check>
            <Check checked={research} onChange={setResearch}>Share anonymised health data to improve VitalLink. You can turn this off at any time.</Check>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <button type="button" className={cx("vl-label-l", s.back)} disabled>Back</button>
        <span className={s.spacer} />
        <Link to="/sign-in" className={cx("vl-body-m-strong", s.link)}>Save and finish later</Link>
        <button type="submit" className={cx("vl-label-l", s.continue)} disabled={!ready}>Continue</button>
      </footer>
    </form>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: string }) {
  return (
    <label className={s.check}>
      <input type="checkbox" className={s.box} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <Txt s="bodyM" c="textSecondary">{children}</Txt>
    </label>
  );
}
