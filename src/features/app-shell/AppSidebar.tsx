import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { NAV } from "./config";
import { SignOutButton } from "./SignOutButton";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-gradient shadow-soft">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-display text-2xl text-primary">ElderGuard</span>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-muted/60",
            )}
            activeProps={{
              className:
                "flex items-center gap-3 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground shadow-soft",
            }}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-sidebar-border bg-sky-gradient p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-gradient font-display font-semibold text-primary-foreground">
            MT
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Margaret Thompson</p>
            <p className="text-[11px] text-muted-foreground">🇬🇧 Manchester</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">Current risk</span>
          <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-semibold text-warning">
            MEDIUM
          </span>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}
