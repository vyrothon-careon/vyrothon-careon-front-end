import { useEffect, useState, memo } from "react";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import confetti from "canvas-confetti";

type ActivatedOverlayProps = {
  patientName: string;
};

export const ActivatedOverlay = memo(function ActivatedOverlay({
  patientName,
}: ActivatedOverlayProps) {
  useEffect(() => {
    const id = window.setInterval(
      () =>
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.4 },
          colors: ["#3b82f6", "#10b981", "#f59e0b"],
        }),
      700,
    );
    return () => window.clearInterval(id);
  }, []);

  const [count, setCount] = useState(3);
  useEffect(() => {
    const t = window.setInterval(() => setCount((c) => Math.max(0, c - 1)), 1000);
    return () => window.clearInterval(t);
  }, []);

  const display = patientName.trim() || "Your loved one";

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-md">
      <div className="animate-scale-in mx-auto max-h-[min(90dvh,560px)] w-full max-w-md overflow-y-auto rounded-3xl bg-card p-8 text-center shadow-card sm:p-10">
        <div className="animate-float-slow mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-gradient shadow-card sm:h-28 sm:w-28">
          <Shield className="h-12 w-12 text-primary-foreground sm:h-14 sm:w-14" />
        </div>
        <h3 className="mt-6 font-display text-2xl sm:text-3xl">ElderGuard Activated</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {display} is now protected. Family will be notified of any concerning vitals.
        </p>
        <Link
          to="/"
          className="btn-press mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-gradient px-8 py-3 font-medium text-primary-foreground shadow-soft"
        >
          Go to Dashboard {count > 0 && `(${count})`}
        </Link>
      </div>
    </div>
  );
});
