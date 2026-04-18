import { createFileRoute } from "@tanstack/react-router";
import { guardDashboard } from "@/lib/auth-guards";
import { SettingsPage } from "@/features/settings";

export const Route = createFileRoute("/settings")({
  beforeLoad: () => {
    guardDashboard();
  },
  head: () => ({
    meta: [
      { title: "Settings — ElderGuard AI" },
      { name: "description", content: "Manage notifications, account and preferences." },
    ],
  }),
  component: SettingsPage,
});
