import { memo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import confetti from "canvas-confetti";
import { PageShell } from "@/layouts/page-shell";
import { GENDERS, STEPS } from "./onboarding-constants";
import { OnboardingStepper } from "./OnboardingStepper";
import { useOnboardingForm } from "./useOnboardingForm";
import { ActivatedOverlay } from "./ActivatedOverlay";

export function OnboardingPage() {
  const form = useOnboardingForm();
  const { fields: f } = form;

  useEffect(() => {
    if (!form.activated) return;
    const t = window.setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#10b981", "#f59e0b"],
      });
      window.setTimeout(
        () => confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } }),
        250,
      );
    }, 300);
    return () => window.clearTimeout(t);
  }, [form.activated]);

  return (
    <PageShell maxWidth="content" className="pb-2">
      <div className="animate-fade-in">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Setup · Step {form.step + 1} of {STEPS.length}
        </span>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
          {form.step === 0 && (
            <>
              Tell us about <em className="text-primary">your loved one</em>
            </>
          )}
          {form.step === 1 && (
            <>
              Set their <em className="text-primary">medical baseline</em>
            </>
          )}
          {form.step === 2 && (
            <>
              Who should we <em className="text-primary">notify in an emergency?</em>
            </>
          )}
          {form.step === 3 && (
            <>
              Ready to <em className="text-primary">activate?</em>
            </>
          )}
        </h1>
      </div>

      <OnboardingStepper step={form.step} />

      {form.loadStatus === "loading" ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          Loading your profile…
        </p>
      ) : null}
      {form.loadError ? (
        <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {form.loadError}
        </p>
      ) : null}

      <div
        className="mt-6 rounded-3xl border border-border/60 bg-card p-5 shadow-card animate-fade-in sm:mt-8 sm:p-6 md:p-7"
        key={form.step}
      >
        {form.step === 0 && (
          <div className="space-y-5">
            <OnboardingField
              label="Full name"
              value={f.full_name}
              onChange={f.setFullName}
              placeholder="Margaret Thompson"
              autoComplete="name"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <OnboardingField
                label="Age"
                value={f.ageStr}
                onChange={f.setAgeStr}
                placeholder="72"
                inputMode="numeric"
              />
              <OnboardingField
                label="City"
                value={f.city}
                onChange={f.setCity}
                placeholder="Manchester"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => f.setGender(g)}
                    className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition btn-press ${f.gender === g ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-muted/60 hover:bg-muted"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {form.step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <OnboardingField
                label="Typical systolic (mmHg)"
                value={f.sysStr}
                onChange={f.setSysStr}
                placeholder="120"
                inputMode="numeric"
              />
              <OnboardingField
                label="Typical diastolic (mmHg)"
                value={f.diaStr}
                onChange={f.setDiaStr}
                placeholder="80"
                inputMode="numeric"
              />
              <OnboardingField
                label="Typical heart rate (bpm)"
                value={f.hrStr}
                onChange={f.setHrStr}
                placeholder="72"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Known diseases</label>
              <textarea
                value={f.known_diseases}
                onChange={(e) => f.setKnownDiseases(e.target.value)}
                rows={3}
                placeholder="e.g. Hypertension, Type 2 diabetes"
                className="mt-1.5 w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Current medications</label>
              <textarea
                value={f.current_medications}
                onChange={(e) => f.setCurrentMedications(e.target.value)}
                rows={3}
                placeholder="List medications and doses…"
                className="mt-1.5 w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}

        {form.step === 2 && (
          <div className="space-y-5">
            <OnboardingField
              label="Emergency contact email"
              value={f.emergency_contact_email}
              onChange={f.setEmergencyContactEmail}
              placeholder="family@example.com"
              type="email"
              autoComplete="email"
            />
            <p className="text-sm text-muted-foreground">
              We&apos;ll use this address for critical alerts about the patient&apos;s health.
            </p>
          </div>
        )}

        {form.step === 3 && (
          <div className="space-y-5">
            <SummaryRow
              label="Patient"
              value={`${form.payload.full_name}, ${form.payload.age} · ${form.payload.gender} · ${form.payload.city}`}
            />
            <SummaryRow
              label="Baseline"
              value={`${form.payload.typical_bp_systolic}/${form.payload.typical_bp_diastolic} mmHg · ${form.payload.typical_heart_rate} bpm`}
            />
            <SummaryRow label="Known diseases" value={form.payload.known_diseases || "—"} />
            <SummaryRow label="Medications" value={form.payload.current_medications || "—"} />
            <SummaryRow label="Emergency email" value={form.payload.emergency_contact_email} />
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-muted/40 p-4 sm:items-center">
              <input
                type="checkbox"
                checked={form.confirm}
                onChange={(e) => form.setConfirm(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded accent-primary sm:mt-0"
              />
              <span className="text-sm">I confirm this information is accurate</span>
            </label>
            <button
              type="button"
              disabled={!form.confirm || form.submitting}
              onClick={() => void form.activate()}
              className="btn-press flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary-gradient py-4 font-medium text-primary-foreground shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Shield className="h-5 w-5" /> {form.submitting ? "Saving…" : "Activate ElderGuard"}
            </button>
          </div>
        )}
      </div>

      {form.stepError && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {form.stepError}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <button
          type="button"
          onClick={form.goBack}
          disabled={form.step === 0}
          className="min-h-12 rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted disabled:opacity-40 btn-press"
        >
          Back
        </button>
        {form.step < STEPS.length - 1 && (
          <button
            type="button"
            onClick={form.goNext}
            disabled={form.loadStatus === "loading" || form.submitting}
            className="min-h-12 rounded-xl bg-primary-gradient px-8 py-3 text-sm font-medium text-primary-foreground shadow-soft btn-press enabled:hover:opacity-95 disabled:opacity-50 sm:ml-auto"
          >
            Continue
          </button>
        )}
      </div>

      {form.activated && <ActivatedOverlay patientName={form.payload.full_name} />}
    </PageShell>
  );
}

const OnboardingField = memo(function OnboardingField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "numeric" | "decimal" | "text" | "search" | "email" | "tel" | "url";
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
});

const SummaryRow = memo(function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-2 last:border-0 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium wrap-break-word sm:max-w-md sm:text-right">{value}</span>
    </div>
  );
});
