import { createFileRoute, redirect } from "@tanstack/react-router";
import { isSignedIn, isOnboardingComplete } from "@/lib/auth";
import { SignUpPage } from "@/features/auth";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create account — ElderGuard AI" },
      {
        name: "description",
        content: "Sign up to start monitoring your loved one with ElderGuard.",
      },
    ],
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (isSignedIn() && isOnboardingComplete()) {
      throw redirect({ to: "/" });
    }
    if (isSignedIn() && !isOnboardingComplete()) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: SignUpPage,
});
