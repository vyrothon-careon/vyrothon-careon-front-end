import { createFileRoute } from "@tanstack/react-router";
import { guardDashboard } from "@/lib/auth-guards";
import { DailyLogPage } from "@/features/daily-log";

export const Route = createFileRoute("/log")({
  beforeLoad: () => {
    guardDashboard();
  },
  head: () => ({
    meta: [
      { title: "Daily Log — ElderGuard AI" },
      {
        name: "description",
        content: "Record today's blood pressure, heart rate, glucose, symptoms and mood.",
      },
      { property: "og:title", content: "Daily Log — ElderGuard AI" },
      { property: "og:description", content: "Track your vitals beautifully." },
    ],
  }),
  component: DailyLogPage,
});
