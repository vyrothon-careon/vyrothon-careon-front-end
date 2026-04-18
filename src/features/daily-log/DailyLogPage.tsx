import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { PageHeader, PageShell } from "@/layouts/page-shell";
import { MOODS, SYMPTOMS } from "./daily-log-constants";
import { bpStatus } from "./daily-log-utils";

export function DailyLogPage() {
  const [sys, setSys] = useState<number | "">("");
  const [dia, setDia] = useState<number | "">("");
  const [hr, setHr] = useState<number | "">("");
  const [glucose, setGlucose] = useState("");
  const [glucoseSkip, setGlucoseSkip] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | "medium" | "critical">(null);

  const status = useMemo(() => bpStatus(Number(sys) || 0), [sys]);

  const toggle = useCallback((s: string) => {
    setSymptoms((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  }, []);

  const submit = useCallback(() => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      const critical = Number(sys) >= 170 || symptoms.includes("Chest pain");
      setSuccess(critical ? "critical" : "medium");
    }, 1500);
  }, [sys, symptoms]);

  return (
    <PageShell maxWidth="content">
      <PageHeader
        badge="Today's Reading"
        title={
          <>
            Record today&apos;s <em className="text-primary">health reading</em>
          </>
        }
        description="Saturday, 18 April 2026"
      />

      <div className="mt-6 space-y-5 sm:mt-8">
        <LogCard>
          <LogCardHeader title="Blood Pressure" sub="Normal: below 120/80 mmHg" />
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <NumInput label="Systolic" value={sys} onChange={setSys} placeholder="120" />
            <span className="pb-2 font-display text-2xl text-muted-foreground sm:text-3xl">/</span>
            <NumInput label="Diastolic" value={dia} onChange={setDia} placeholder="80" />
            <span className="pb-3 text-sm text-muted-foreground">mmHg</span>
          </div>
          <div className="mt-6">
            <div
              className="relative h-3 overflow-hidden rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.68 0.16 155), oklch(0.78 0.16 95) 35%, oklch(0.78 0.16 75) 60%, oklch(0.7 0.2 45) 80%, oklch(0.62 0.22 25))",
              }}
            >
              <div
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-card bg-card shadow-soft transition-all duration-500 ease-out"
                style={{ left: `calc(${status.pct}% - 10px)`, borderColor: status.color }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Optimal</span>
              <span className="font-semibold" style={{ color: status.color }}>
                {status.label}
              </span>
              <span className="text-muted-foreground">High</span>
            </div>
          </div>
        </LogCard>

        <LogCard>
          <LogCardHeader title="Heart Rate" sub="Beats per minute" />
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <Heart
                className="h-16 w-16 sm:h-20 sm:w-20"
                style={{
                  color: "oklch(0.62 0.22 20)",
                  fill: "oklch(0.62 0.22 20)",
                  animation: `heartbeat ${hr ? 60 / Number(hr) : 1.2}s ease-in-out infinite`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-white sm:text-xl">
                  {hr || "—"}
                </span>
              </div>
            </div>
            <div className="w-full min-w-0 flex-1">
              <NumInput label="" value={hr} onChange={setHr} placeholder="72" big />
              <p className="mt-2 text-xs text-muted-foreground">
                bpm — heart pulses with your rate
              </p>
            </div>
          </div>
        </LogCard>

        <LogCard className={glucoseSkip ? "opacity-60" : ""}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <LogCardHeader title="Blood Glucose" sub="Optional" />
            <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={glucoseSkip}
                onChange={(e) => setGlucoseSkip(e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              Not measured
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <input
              type="number"
              disabled={glucoseSkip}
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              placeholder="5.4"
              className="min-w-0 max-w-full border-b-2 border-border bg-transparent pb-1 font-display text-2xl font-semibold text-primary outline-none transition focus:border-primary disabled:opacity-50 sm:w-32 sm:text-3xl"
            />
            <span className="pb-3 text-sm text-muted-foreground">mmol/L</span>
          </div>
        </LogCard>

        <LogCard>
          <LogCardHeader title="Symptoms" sub="Any symptoms today? (select all that apply)" />
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
            {SYMPTOMS.map((s) => {
              const active = symptoms.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(s)}
                  className={`min-h-11 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 btn-press sm:px-5 ${active ? "scale-105 bg-primary text-primary-foreground shadow-soft" : "border border-border bg-muted/60 hover:bg-muted"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </LogCard>

        <LogCard>
          <LogCardHeader title="How are you feeling?" sub="Select your overall mood" />
          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
            {MOODS.map((emoji, i) => {
              const active = mood === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMood(i)}
                  className={`btn-press flex aspect-square min-h-[3rem] items-center justify-center rounded-2xl text-3xl transition-all duration-300 sm:text-4xl ${active ? "scale-110 bg-primary/10 ring-4 ring-primary" : "bg-muted/40 hover:bg-muted/70"}`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>
        </LogCard>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={submitting}
        className="btn-press mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary-gradient py-4 font-medium text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />{" "}
            Analysing…
          </>
        ) : (
          <>
            <Check className="h-5 w-5" /> Submit Reading
          </>
        )}
      </button>

      {success && <SuccessOverlay level={success} onClose={() => setSuccess(null)} />}
    </PageShell>
  );
}

const SuccessOverlay = memo(function SuccessOverlay({
  level,
  onClose,
}: {
  level: "medium" | "critical";
  onClose: () => void;
}) {
  const critical = level === "critical";
  return (
    <div
      className={`animate-fade-in fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${critical ? "bg-destructive/30" : "bg-foreground/40"}`}
    >
      <div className="animate-scale-in mx-auto max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-3xl bg-card p-8 text-center shadow-card sm:p-10">
        <div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28"
          style={{
            background: critical ? "oklch(0.62 0.22 25 / 0.15)" : "oklch(0.68 0.16 155 / 0.15)",
          }}
        >
          <svg viewBox="0 0 52 52" className="h-14 w-14">
            <circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke={critical ? "oklch(0.62 0.22 25)" : "oklch(0.68 0.16 155)"}
              strokeWidth="2"
              strokeDasharray="160"
              strokeDashoffset="160"
              style={{ animation: "check-draw 0.6s ease-out forwards" }}
            />
            <path
              d="M14 27 l8 8 l16-16"
              fill="none"
              stroke={critical ? "oklch(0.62 0.22 25)" : "oklch(0.68 0.16 155)"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              style={{ animation: "check-draw 0.4s ease-out 0.5s forwards" }}
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl sm:text-3xl">Reading Recorded!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {critical
            ? "Emergency Alert Sent to Family"
            : "AI analysis complete — Your risk level is MEDIUM"}
        </p>
        <Link
          to="/"
          onClick={onClose}
          className="btn-press mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-gradient px-6 py-3 font-medium text-primary-foreground shadow-soft"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
});

const LogCard = memo(function LogCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-opacity sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
});

const LogCardHeader = memo(function LogCardHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h3 className="font-display text-lg sm:text-xl">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
});

const NumInput = memo(function NumInput({
  label,
  value,
  onChange,
  placeholder,
  big = false,
}: {
  label: string;
  value: number | "";
  onChange: (v: number | "") => void;
  placeholder: string;
  big?: boolean;
}) {
  return (
    <div className={big ? "min-w-0 flex-1" : "min-w-0"}>
      {label ? (
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      ) : null}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder={placeholder}
        className={`border-b-2 border-border bg-transparent pb-1 font-display font-semibold text-primary outline-none transition focus:border-primary ${big ? "w-full text-3xl" : "w-full min-w-[5rem] max-w-[8rem] text-2xl sm:w-24 sm:text-3xl"}`}
      />
    </div>
  );
});
