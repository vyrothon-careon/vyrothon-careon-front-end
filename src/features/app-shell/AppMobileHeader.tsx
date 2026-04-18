import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export function AppMobileHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md lg:hidden">
      <div className="flex h-14 min-h-14 items-center justify-between gap-3 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-gradient">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="truncate font-display text-lg text-primary">ElderGuard</span>
        </Link>
        <SignOutButton iconOnly className="shrink-0" />
      </div>
    </header>
  );
}
