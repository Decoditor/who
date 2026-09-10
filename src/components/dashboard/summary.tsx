import { ArrowUpRight } from "lucide-react";

import type { DashboardStats } from "@/types";

interface DashboardSummaryProps {
    stats: DashboardStats;
}

export function DashboardSummary({
    stats,
}: DashboardSummaryProps) {
    return (
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Total endorsements
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight">
                    {stats.totalEndorsements.toLocaleString()}
                </p>
            </div>

            <div className="bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Since last update
                </p>

                <div className="mt-3 flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-coral" />

                    <p className="text-3xl font-bold tracking-tight">
                        +{stats.changeSincePreviousUpdate}
                    </p>
                </div>
            </div>

            <div className="bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Showing
                </p>

                <p className="mt-3 text-2xl font-bold tracking-tight">
                    {stats.state ?? "Nigeria"}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    {stats.state
                        ? "State endorsements"
                        : "Nationwide endorsements"}
                </p>
            </div>
        </div>
    );
}