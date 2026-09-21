import {
    BarChart3,
    FileImage,
    LayoutDashboard,
    ListChecks,
    Settings,
    ShieldCheck,
    Users,
    Vote,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { UserRole } from "@/types/users";

interface DashboardNavProps {
    role: UserRole;
}

const userLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Picks",
        href: "/dashboard/picks",
        icon: ListChecks,
    },
    {
        label: "My Cards",
        href: "/dashboard/cards",
        icon: FileImage,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

const adminLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Elections",
        href: "/dashboard/elections",
        icon: Vote,
    },
    {
        label: "Candidates",
        href: "/dashboard/candidates",
        icon: Users,
    },
    {
        label: "Parties",
        href: "/dashboard/parties",
        icon: ShieldCheck,
    },
    {
        label: "Picks",
        href: "/dashboard/picks",
        icon: ListChecks,
    },
    {
        label: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        label: "Memes",
        href: "/dashboard/memes",
        icon: FileImage,
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        label: "Administrators",
        href: "/dashboard/admins",
        icon: ShieldCheck,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardNav({
    role,
}: DashboardNavProps) {
    const { pathname } = useLocation();

    const links =
        role === "admin" ? adminLinks : userLinks;

    return (
        <SidebarMenu>
            {links.map((link) => {
                const isActive =
                    link.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(link.href);

                const Icon = link.icon;

                return (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                            isActive={isActive}
                            tooltip={link.label}
                        >
                            <Link to={link.href}>
                                <Icon />
                                <span>{link.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}