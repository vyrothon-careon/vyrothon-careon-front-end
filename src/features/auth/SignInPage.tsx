import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthPageShell } from "@/layouts/auth-page-shell";
import { ApiError, careonApi } from "@/lib/api";
import { persistSessionFromAuthResponse } from "@/lib/auth";

export function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!email.trim() || !password) {
        setError("Please enter email and password.");
        return;
      }
      setLoading(true);
      try {
        const res = await careonApi.login({
          email: email.trim().toLowerCase(),
          password,
        });
        persistSessionFromAuthResponse(res);
        if (res.is_onboarded) {
          navigate({ to: "/" });
        } else {
          navigate({ to: "/onboarding" });
        }
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Sign in failed. Try again.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, navigate],
  );

  const brand = useMemo(
    () => (
      <Link to="/" className="mb-8 flex items-center justify-center gap-2.5 sm:mb-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-soft">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-display text-2xl text-primary">ElderGuard</span>
      </Link>
    ),
    [],
  );

  return (
    <AuthPageShell>
      {brand}
      <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Step 2 · Welcome back
        </span>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl">
          Sign in to <em className="text-primary">ElderGuard</em>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          After signing in you&apos;ll complete onboarding or open your dashboard.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="si-email">Email</Label>
            <Input
              id="si-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border-border bg-muted/50"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="si-password">Password</Label>
            <Input
              id="si-password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl border-border bg-muted/50"
              disabled={loading}
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn-press min-h-12 w-full rounded-xl bg-primary-gradient py-3.5 font-medium text-primary-foreground shadow-soft disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need an account?{" "}
          <Link to="/sign-up" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
