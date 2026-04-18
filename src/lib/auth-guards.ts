import { redirect } from "@tanstack/react-router";
import { isOnboardingComplete, isSignedIn } from "@/lib/auth";

/** Dashboard and other main app routes: must be signed in and onboarding finished. */
export function guardDashboard(): void {
  if (typeof window === "undefined") return;
  if (!isSignedIn()) throw redirect({ to: "/sign-in" });
  if (!isOnboardingComplete()) throw redirect({ to: "/onboarding" });
}

/** Onboarding: must be signed in. */
export function guardOnboarding(): void {
  if (typeof window === "undefined") return;
  if (!isSignedIn()) throw redirect({ to: "/sign-in" });
}
