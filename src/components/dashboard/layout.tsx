import { Outlet } from "react-router-dom";

import { DashboardSidebar } from "@/components/dashboard/sidebar";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function DashboardLayout() {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
                    <SidebarTrigger />

                    <Separator
                        orientation="vertical"
                        className="h-5"
                    />

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            Who.ng Dashboard
                        </p>
                    </div>
                </header>

                <main className="min-w-0 flex-1 bg-background">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}