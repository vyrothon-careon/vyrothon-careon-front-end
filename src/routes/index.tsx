import { createFileRoute } from "@tanstack/react-router";
import { guardDashboard } from "@/lib/auth-guards";
import { DashboardPage } from "@/features/dashboard";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    guardDashboard();
  },
  head: () => ({
    meta: [
      { title: "Health Analysis Report — ElderGuard AI" },
      {
        name: "description",
        content: "Monthly health summary with vitals, scores and recent events for your loved one.",
      },
      { property: "og:title", content: "Health Analysis Report — ElderGuard AI" },
      { property: "og:description", content: "Your monthly health analysis at a glance." },
    ],
  }),
  component: DashboardPage,
});
