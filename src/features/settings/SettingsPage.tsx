import { memo } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader, PageShell } from "@/layouts/page-shell";

export const SettingsPage = memo(function SettingsPage() {
  return (
    <PageShell maxWidth="content">
      <PageHeader
        badge="Account"
        title="Settings"
        description="Notifications, preferences and integrations."
      />

      <div className="mt-6 rounded-3xl border border-border/60 bg-card p-8 text-center shadow-soft sm:mt-8 sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SettingsIcon className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-display text-2xl">Coming soon</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Notification channels, language, units and family permissions will live here.
        </p>
      </div>
    </PageShell>
  );
});
