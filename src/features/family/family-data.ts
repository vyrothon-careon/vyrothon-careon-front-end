import type { LucideIcon } from "lucide-react";
import { Activity, AlertTriangle, Bell, CheckCircle2 } from "lucide-react";
import type { FamilyContact } from "./family-types";

export const INITIAL_CONTACTS: FamilyContact[] = [
  {
    name: "James Thompson",
    relation: "Son",
    phone: "+44 7700 900142",
    email: "james@example.com",
    initials: "JT",
    alertOn: true,
  },
  {
    name: "Sarah Thompson",
    relation: "Daughter",
    phone: "+44 7700 900287",
    email: "sarah@example.com",
    initials: "ST",
    alertOn: true,
  },
  {
    name: "Dr. Patel",
    relation: "GP",
    phone: "+44 7700 900391",
    email: "drpatel@nhsgp.co.uk",
    initials: "DP",
    alertOn: false,
  },
];

export type TimelineEntry = {
  time: string;
  title: string;
  desc: string;
  color: string;
  icon: LucideIcon;
  full: string;
};

export const FAMILY_TIMELINE: TimelineEntry[] = [
  {
    time: "Apr 18, 09:42",
    title: "Morning vitals shared with family",
    desc: "BP 142/91 · HR 78 bpm · marked as MEDIUM risk",
    color: "oklch(0.78 0.16 75)",
    icon: Activity,
    full: "Hi James, Margaret's morning reading came in at 142/91 mmHg. Risk level: MEDIUM. We're monitoring closely.",
  },
  {
    time: "Apr 14, 18:20",
    title: "Alert sent to James via WhatsApp & Email",
    desc: "Systolic 156 mmHg — caregiver notified",
    color: "oklch(0.78 0.16 75)",
    icon: Bell,
    full: "Margaret's evening reading was 156/96 mmHg. Above her baseline. Please check in when you can.",
  },
  {
    time: "Apr 08, 10:05",
    title: "CRITICAL alert sent to James Thompson via WhatsApp & Email",
    desc: "BP reached 182/112 mmHg — emergency contact triggered",
    color: "oklch(0.62 0.22 25)",
    icon: AlertTriangle,
    full: "URGENT: Margaret's BP reached 182/112 mmHg at 10:05. Please call her immediately. Dr. Patel has also been notified.",
  },
  {
    time: "Apr 03, 14:32",
    title: "Alert sent to Sarah via Email",
    desc: "Systolic 162 mmHg recorded",
    color: "oklch(0.78 0.16 75)",
    icon: Bell,
    full: "Sarah, Margaret recorded 162/101 mmHg this afternoon. Please check in.",
  },
  {
    time: "Mar 30, 08:00",
    title: "Weekly summary delivered",
    desc: "All family members received PDF report",
    color: "oklch(0.62 0.18 255)",
    icon: CheckCircle2,
    full: "Weekly health summary delivered to all 3 emergency contacts.",
  },
];
