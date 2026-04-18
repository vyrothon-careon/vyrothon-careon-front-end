import { memo, useMemo } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

export const Metric = memo(function Metric({
  icon: Icon,
  color,
  label,
  value,
  trend,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  label: string;
  value: string;
  trend: { label: string; tone: "ok" | "warn" | "neutral" };
}) {
  const toneClass = useMemo(() => {
    if (trend.tone === "ok") return "bg-success/15 text-success";
    if (trend.tone === "warn") return "bg-warning/15 text-warning";
    return "bg-muted text-muted-foreground";
  }, [trend.tone]);

  const TrendIcon = trend.tone === "ok" ? ArrowUp : trend.tone === "warn" ? ArrowDown : Minus;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in oklab, ${color} 12%, transparent)` }}
      >
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
      <span
        className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass}`}
      >
        <TrendIcon className="h-2.5 w-2.5" />
        {trend.label}
      </span>
    </div>
  );
});

export const ScoreRing = memo(function ScoreRing({
  score,
  small = false,
  color = "oklch(0.58 0.2 258)",
}: {
  score: number;
  small?: boolean;
  color?: string;
}) {
  const { r, c, off, size } = useMemo(() => {
    const rVal = small ? 26 : 32;
    const cVal = 2 * Math.PI * rVal;
    const offVal = cVal - (score / 100) * cVal;
    const sizeVal = small ? 64 : 80;
    return { r: rVal, c: cVal, off: offVal, size: sizeVal };
  }, [score, small]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(0.94 0.02 240)"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-semibold ${small ? "text-xs" : "text-sm"}`} style={{ color }}>
          {score}%
        </span>
      </div>
    </div>
  );
});

export const Bar2 = memo(function Bar2({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
});

export const PressureBar = memo(function PressureBar({
  label,
  value,
  max,
  unit,
  color,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}) {
  const pct = useMemo(() => (value / max) * 100, [value, max]);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">
          {value} {unit}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
});

export const Event = memo(function Event({
  color,
  title,
  time,
}: {
  color: string;
  title: string;
  time: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{time}</p>
      </div>
    </li>
  );
});

export const Gauge = memo(function Gauge({ value }: { value: number }) {
  const angle = useMemo(() => (value / 100) * 180 - 90, [value]);
  return (
    <div className="relative h-14 w-24">
      <svg viewBox="0 0 100 60" className="h-full w-full">
        <path
          d="M10,55 A40,40 0 0 1 90,55"
          fill="none"
          stroke="oklch(0.94 0.02 240)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M10,55 A40,40 0 0 1 90,55"
          fill="none"
          stroke="oklch(0.68 0.16 155)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="126"
          strokeDashoffset={126 - (value / 100) * 126}
          style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
        />
        <line
          x1="50"
          y1="55"
          x2="50"
          y2="22"
          stroke="oklch(0.22 0.05 250)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: "50px 55px",
            transform: `rotate(${angle}deg)`,
            transition: "transform 1.2s ease-out",
          }}
        />
        <circle cx="50" cy="55" r="3" fill="oklch(0.22 0.05 250)" />
      </svg>
      <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">
        Mild
      </p>
    </div>
  );
});
