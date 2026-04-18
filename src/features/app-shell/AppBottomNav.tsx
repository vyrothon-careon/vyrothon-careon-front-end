import { Link } from "@tanstack/react-router";
import { NAV } from "./config";
import { cn } from "@/lib/utils";

/**
 * Fixed bottom navigation for small viewports — thumb-friendly, safe-area aware.
 */
export function AppBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md lg:hidden"
      aria-label="Main navigation"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around gap-0 px-1 pt-1">
        {NAV.map((item) => (
          <li key={item.to} className="min-w-0 flex-1">
            <Link
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className={cn(
                "flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors",
              )}
              activeProps={{
                className:
                  "flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-xl bg-primary/10 px-1 py-1.5 text-[10px] font-semibold text-primary",
              }}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
