/** Stable chart series — avoids Math.random() churn on each render / HMR. */
export const HR_BARS = Array.from({ length: 14 }, (_, i) => ({
  d: i,
  v: 55 + Math.round(Math.sin(i / 1.6) * 12 + ((i * 11) % 15)),
}));

export const ECG = Array.from({ length: 60 }, (_, i) => {
  const m = i % 15;
  const v = m === 5 ? 30 : m === 6 ? -20 : m === 7 ? 60 : m === 8 ? -10 : 0;
  return { i, v };
});
