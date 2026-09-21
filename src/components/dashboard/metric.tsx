import type { DashboardMetric } from "@/data/dashboard/overview";
import { ArrowUpRight } from "lucide-react";


interface MetricCardProps {
    metric: DashboardMetric;
}

export function MetricCard({
    metric,
}: MetricCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                </p>

                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <ArrowUpRight className="size-4" />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-3xl font-semibold tracking-tight">
                    {metric.value}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-medium text-primary">
                        {metric.change}
                    </span>

                    <span className="text-muted-foreground">
                        {metric.description}
                    </span>
                </div>
            </div>
        </div>
    );
}