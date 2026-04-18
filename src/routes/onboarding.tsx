import { createFileRoute, redirect } from "@tanstack/react-router";
import { guardOnboarding } from "@/lib/auth-guards";
import { isOnboardingComplete } from "@/lib/auth";
import { OnboardingPage } from "@/features/onboarding";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: () => {
    guardOnboarding();
    if (typeof window !== "undefined" && isOnboardingComplete()) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Onboarding — ElderGuard AI" },
      {
        name: "description",
        content: "Set up ElderGuard AI in a few steps to start monitoring your loved one.",
      },
      { property: "og:title", content: "Activate ElderGuard AI" },
      { property: "og:description", content: "Set up monitoring in a few simple steps." },
    ],
  }),
  component: OnboardingPage,
});
