import { Link, useLocation } from "react-router-dom";
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

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar";
import { routes } from "@/routes/routes";
import { getUserRole } from "@/lib/roles";

interface DashboardNavItem {
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

const CURRENT_USER_EMAIL = "absamaard@gmail.com";

export function DashboardSidebar() {
    const { isMobile, setOpenMobile } = useSidebar();
    const location = useLocation();
    const role = getUserRole(CURRENT_USER_EMAIL);
    const isAdmin = role === "admin";

    const visibleItems = dashboardNavigation.filter(
        (item) => !item.adminOnly || isAdmin,
    );

    const overviewItems = visibleItems.filter(
        (item) =>
            item.title === "Dashboard" ||
            item.title === "My Picks" ||
            item.title === "Live",
    );

    const manageItems = visibleItems.filter(
        (item) => item.adminOnly,
    );

    const isActive = (href: string) => {
        if (href === routes.dashboard) {
            return location.pathname === href;
        }

        return (
            location.pathname === href ||
            location.pathname.startsWith(`${href}/`)
        );
    };

    const renderNavItem = (item: DashboardNavItem) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
            <SidebarMenuButton
                render={<Link to={item.href} />}
                isActive={active}
                tooltip={item.title}
                onClick={() => {
                    if (isMobile) {
                        setOpenMobile(false);
                    }
                }}
                className="
        h-10 rounded-lg px-3
        text-primary-foreground/65
        transition-colors
        hover:bg-primary-foreground/10
        hover:text-primary-foreground
        data-[active=true]:bg-primary-foreground
        data-[active=true]:text-primary
        data-[active=true]:shadow-sm
        data-[active=true]:hover:bg-primary-foreground
    "
            >
                <Icon className="size-4.5" />
                <span>{item.title}</span>
            </SidebarMenuButton>
        );
    };

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-primary bg-primary text-primary-foreground"
        >
            <SidebarHeader className="border-b border-primary-foreground/15 bg-primary px-4 py-5">
                <Link
                    to={routes.dashboard}
                    className="flex items-center gap-3"
                >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                        <span className="text-sm font-black">
                            w
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="font-black tracking-tight text-primary-foreground">
                            who.ng
                        </p>

                        <p className="text-xs text-primary-foreground/60">
                            Civic platform
                        </p>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="bg-primary">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-primary-foreground/45">
                        Overview
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {overviewItems.map(renderNavItem)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {manageItems.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-primary-foreground/45">
                            Manage
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {manageItems.map(renderNavItem)}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-primary-foreground/15 bg-primary p-3">
                <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary-foreground/10">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                        <span className="text-sm font-semibold text-primary-foreground">
                            AS
                        </span>
                    </div>

                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="truncate text-sm font-medium text-primary-foreground">
                            AbdulSamad
                        </p>

                        <p className="truncate text-xs text-primary-foreground/55">
                            Administrator
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}