import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthPageShell } from "@/layouts/auth-page-shell";
import { ApiError, careonApi } from "@/lib/api";

export function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!email.trim() || !password) {
        setError("Please fill in all fields.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirm) {
        setError("Passwords do not match.");
        return;
      }
      setLoading(true);
      try {
        await careonApi.signup({
          email: email.trim().toLowerCase(),
          password,
        });
        navigate({ to: "/sign-in" });
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Sign up failed. Try again.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, confirm, navigate],
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
          Step 1 · Account
        </span>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl">
          Create your <em className="text-primary">account</em>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Next you&apos;ll sign in, then set up monitoring for your loved one.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="su-email">Email</Label>
            <Input
              id="su-email"
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
            <Label htmlFor="su-password">Password</Label>
            <Input
              id="su-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl border-border bg-muted/50"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="su-confirm">Confirm password</Label>
            <Input
              id="su-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Creating account…" : "Continue to sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
