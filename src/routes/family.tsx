import { createFileRoute } from "@tanstack/react-router";
import { guardDashboard } from "@/lib/auth-guards";
import { FamilyViewPage } from "@/features/family";

export const Route = createFileRoute("/family")({
  beforeLoad: () => {
    guardDashboard();
  },
  head: () => ({
    meta: [
      { title: "Family View — ElderGuard AI" },
      {
        name: "description",
        content:
          "Patient summary, emergency contacts and shared alert history for the whole family.",
      },
      { property: "og:title", content: "Family View — ElderGuard AI" },
      { property: "og:description", content: "Stay connected with your loved one's health." },
    ],
  }),
  component: FamilyViewPage,
});
