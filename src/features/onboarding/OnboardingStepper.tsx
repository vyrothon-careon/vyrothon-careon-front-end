import { memo } from "react";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { STEPS } from "./onboarding-constants";
import { cn } from "@/lib/utils";

type OnboardingStepperProps = {
  step: number;
};

export const OnboardingStepper = memo(function OnboardingStepper({ step }: OnboardingStepperProps) {
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between gap-2 md:hidden">
        <p className="min-w-0 truncate text-xs font-medium text-muted-foreground">
          <span className="text-primary">{STEPS[step]}</span>
        </p>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {step + 1}/{STEPS.length}
        </span>
      </div>
      <div className="mt-2 md:hidden">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="hidden items-center gap-2 md:flex">
        {STEPS.map((_, i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all",
                i <= step
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn("h-0.5 flex-1 transition-all", i < step ? "bg-primary" : "bg-border")}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 hidden grid-cols-4 gap-2 text-[11px] text-muted-foreground md:grid">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={cn("text-center", i === step ? "font-semibold text-primary" : "")}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
});
