import { createFileRoute, redirect } from "@tanstack/react-router";
import { isSignedIn, isOnboardingComplete } from "@/lib/auth";
import { SignInPage } from "@/features/auth";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — ElderGuard AI" },
      { name: "description", content: "Sign in to your ElderGuard dashboard." },
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
  component: SignInPage,
});
