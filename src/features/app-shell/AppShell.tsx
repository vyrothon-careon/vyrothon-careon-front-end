import { Outlet, useLocation } from "@tanstack/react-router";
import { AUTH_PATHS } from "./config";
import { AppBottomNav } from "./AppBottomNav";
import { AppMobileHeader } from "./AppMobileHeader";
import { AppSidebar } from "./AppSidebar";

export function AppShell() {
  const location = useLocation();
  const isAuthPage = (AUTH_PATHS as readonly string[]).includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppMobileHeader />
        <main
          className="flex-1 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0"
          key={location.pathname}
        >
          <div className="animate-fade-in min-h-[calc(100dvh-3.5rem)] lg:min-h-0">
            <Outlet />
          </div>
        </main>
        <AppBottomNav />
      </div>
    </div>
  );
}
