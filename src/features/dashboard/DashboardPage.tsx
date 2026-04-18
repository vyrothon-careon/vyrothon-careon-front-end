import { useMemo } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Droplet,
  FileDown,
  Footprints,
  GlassWater,
  Heart,
  Mail,
  Share2,
  Smile,
  Wind,
  ChevronRight,
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { CountUp } from "@/components/CountUp";
import { PageHeader, PageShell } from "@/layouts/page-shell";
import { ECG, HR_BARS } from "./dashboard-data";
import { Bar2, Event, Gauge, Metric, PressureBar, ScoreRing } from "./dashboard-widgets";

export function DashboardPage() {
  const headerActions = useMemo(
    () => (
      <>
        <button
          type="button"
          className="btn-press flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary/40 sm:w-auto"
        >
          <Mail className="h-4 w-4 text-destructive" /> Send to Gmail
        </button>
        <button
          type="button"
          className="btn-press flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-gradient px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-soft sm:w-auto"
        >
          <FileDown className="h-4 w-4" /> Generate PDF
        </button>
        <button
          type="button"
          className="btn-press flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/40"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </>
    ),
    [],
  );

  return (
    <PageShell maxWidth="wide">
      <PageHeader
        badge="Monthly Summary"
        title={
          <>
            Health Analysis <em className="text-primary">Report</em>
          </>
        }
        description="Generated · April 18, 2026 · Monthly Summary"
        actions={headerActions}
      />

      <div className="mt-6 grid grid-cols-12 gap-4 sm:mt-8 sm:gap-5 lg:gap-5">
        <div className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6 lg:col-span-3 lg:row-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Key Metrics</h3>
            <a
              href="#"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View all <ChevronRight className="h-3 w-3" />
            </a>
          </div>
          <p className="text-[11px] text-muted-foreground">Today</p>
          <div className="mt-5 space-y-4">
            <Metric
              icon={Heart}
              color="oklch(0.62 0.22 20)"
              label="Resting HR"
              value="72 bpm"
              trend={{ label: "+2", tone: "warn" }}
            />
            <Metric
              icon={Activity}
              color="oklch(0.58 0.2 258)"
              label="Sleep Quality"
              value="7h 22m avg"
              trend={{ label: "+12m", tone: "ok" }}
            />
            <Metric
              icon={Droplet}
              color="oklch(0.6 0.22 25)"
              label="Blood Glucose"
              value="95 mg/dL"
              trend={{ label: "Stable", tone: "neutral" }}
            />
            <Metric
              icon={Wind}
              color="oklch(0.58 0.18 260)"
              label="Oxygen Saturation"
              value="98 %"
              trend={{ label: "Great", tone: "ok" }}
            />
            <Metric
              icon={Footprints}
              color="oklch(0.78 0.16 75)"
              label="Steps Today"
              value="8,420"
              trend={{ label: "+840", tone: "ok" }}
            />
            <Metric
              icon={GlassWater}
              color="oklch(0.62 0.18 200)"
              label="Hydration"
              value="1.8 / 2.5 L"
              trend={{ label: "Low", tone: "warn" }}
            />
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:col-span-6 sm:p-6 lg:col-span-3"
          style={{ animationDelay: "60ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Overall Health Score
          </p>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-5xl text-primary sm:text-6xl">
                  <CountUp end={84} duration={1200} />
                </span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
              <p className="mt-1 text-xs font-medium text-success">↑ +6 vs last month</p>
            </div>
            <ScoreRing score={84} />
          </div>
          <div className="mt-5 space-y-2.5">
            <Bar2 label="Cardiovascular" value={88} color="oklch(0.58 0.2 258)" />
            <Bar2 label="Metabolic" value={76} color="oklch(0.78 0.16 75)" />
            <Bar2 label="Sleep" value={82} color="oklch(0.68 0.16 155)" />
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:col-span-6 sm:p-6 lg:col-span-3"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Heart Rate
            </p>
            <Heart className="h-4 w-4 fill-current text-destructive" />
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display text-4xl text-primary sm:text-5xl">
              <CountUp end={72} />
            </span>
            <span className="text-xs text-muted-foreground">bpm</span>
          </div>
          <p className="mt-1 text-xs text-success">Normal</p>
          <div className="-mx-2 mt-3 h-[100px] min-h-[100px] sm:h-[110px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HR_BARS} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    background: "white",
                    border: "1px solid oklch(0.92 0.02 240)",
                    borderRadius: 12,
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="v" radius={[3, 3, 0, 0]} fill="oklch(0.7 0.16 250)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6 lg:col-span-3"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Blood Pressure
            </p>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-3.5 w-3.5 text-primary" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display text-4xl text-primary sm:text-5xl">
              <CountUp end={120} />
            </span>
            <span className="text-xs text-muted-foreground">/80</span>
          </div>
          <p className="mt-1 text-xs text-success">Optimal</p>
          <div className="mt-4 space-y-3">
            <PressureBar
              label="Systolic"
              value={120}
              max={180}
              unit="mmHg"
              color="oklch(0.58 0.2 258)"
            />
            <PressureBar
              label="Diastolic"
              value={80}
              max={120}
              unit="mmHg"
              color="oklch(0.68 0.16 155)"
            />
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:col-span-6 sm:p-6 lg:col-start-4 lg:col-span-3"
          style={{ animationDelay: "240ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recent Events
          </p>
          <ul className="mt-4 space-y-3.5">
            <Event color="oklch(0.58 0.2 258)" title="BP check logged" time="Today · 9:42 AM" />
            <Event
              color="oklch(0.68 0.16 155)"
              title="Sleep goal achieved"
              time="Yesterday · 7:30 AM"
            />
            <Event
              color="oklch(0.78 0.16 75)"
              title="Elevated glucose alert"
              time="Apr 16 · 7:00 PM"
            />
            <Event
              color="oklch(0.58 0.2 258)"
              title="Monthly report ready"
              time="Apr 15 · 10:00 PM"
            />
          </ul>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:col-span-6 sm:p-6 lg:col-span-3"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            BMI
          </p>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-primary sm:text-5xl">
                  <CountUp end={23.5} decimals={1} />
                </span>
              </div>
              <p className="mt-1 text-xs text-success">Healthy</p>
            </div>
            <ScoreRing score={66} small color="oklch(0.68 0.16 155)" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] sm:gap-3">
            <div>
              <p className="text-muted-foreground">Weight</p>
              <p className="font-semibold">72 kg</p>
            </div>
            <div>
              <p className="text-muted-foreground">Height</p>
              <p className="font-semibold">175 cm</p>
            </div>
            <div>
              <p className="text-muted-foreground">Body Fat</p>
              <p className="font-semibold">14.2 %</p>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:col-span-6 sm:p-6 lg:col-span-3"
          style={{ animationDelay: "360ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Oxygen (SpO₂)
          </p>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-primary sm:text-5xl">
                  <CountUp end={98} />
                </span>
                <span className="text-xs text-muted-foreground">%</span>
              </div>
              <p className="mt-1 text-xs text-success">Excellent</p>
            </div>
            <ScoreRing score={98} small color="oklch(0.62 0.18 280)" />
          </div>
          <div className="-mx-2 mt-3 h-[56px] min-h-[56px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ECG}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="oklch(0.62 0.18 280)"
                  strokeWidth={1.6}
                  dot={false}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="animate-fade-in col-span-12 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:p-6 lg:col-span-3"
          style={{ animationDelay: "420ms" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Stress Level
            </p>
            <Smile className="h-4 w-4 text-warning" />
          </div>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div>
              <p className="font-display text-4xl text-primary sm:text-5xl">Low</p>
              <p className="mt-1 text-xs text-success">↓ -12%</p>
            </div>
            <Gauge value={28} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
