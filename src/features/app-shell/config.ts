import {
  Activity,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export const AUTH_PATHS = ["/sign-in", "/sign-up"] as const;

export type NavItem = {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly exact: boolean;
};

export const NAV: readonly NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/log", label: "Log", icon: ClipboardList, exact: false },
  { to: "/family", label: "Family", icon: Users, exact: false },
  { to: "/onboarding", label: "Setup", icon: Shield, exact: false },
  { to: "/settings", label: "Settings", icon: Settings, exact: false },
] as const;
