export function bpStatus(s: number) {
  if (!s) return { label: "—", color: "oklch(0.7 0.02 250)", pct: 0 };
  if (s < 120) return { label: "Optimal", color: "oklch(0.68 0.16 155)", pct: 22 };
  if (s < 130) return { label: "Normal", color: "oklch(0.7 0.16 130)", pct: 42 };
  if (s < 140) return { label: "Elevated", color: "oklch(0.78 0.16 75)", pct: 60 };
  if (s < 160) return { label: "High Stage 1", color: "oklch(0.7 0.2 45)", pct: 78 };
  return { label: "High Stage 2", color: "oklch(0.62 0.22 25)", pct: 95 };
}
