import {
    BarChart3,
    FileImage,
    LayoutDashboard,
    Radio,
    Settings,
    Trophy,
    Users,
    Vote,
} from "lucide-react";

import { routes } from "@/routes/routes";

export interface DashboardNavItem {
    title: string;
    href: string;
    icon: typeof LayoutDashboard;
    adminOnly?: boolean;
}

export const dashboardNavigation: DashboardNavItem[] = [
    {
        title: "Dashboard",
        href: routes.dashboard,
        icon: LayoutDashboard,
    },
    {
        title: "My Picks",
        href: routes.dashboardPicks,
        icon: Vote,
    },
    {
        title: "Live",
        href: routes.dashboardLive,
        icon: Radio,
    },
    {
        title: "Candidates",
        href: routes.dashboardCandidates,
        icon: Users,
        adminOnly: true,
    },
    {
        title: "Elections",
        href: routes.dashboardElections,
        icon: Trophy,
        adminOnly: true,
    },
    {
        title: "Templates",
        href: routes.dashboardTemplates,
        icon: FileImage,
        adminOnly: true,
    },
    {
        title: "Analytics",
        href: routes.dashboardAnalytics,
        icon: BarChart3,
        adminOnly: true,
    },
    {
        title: "Settings",
        href: routes.dashboardSettings,
        icon: Settings,
        adminOnly: true,
    },
];