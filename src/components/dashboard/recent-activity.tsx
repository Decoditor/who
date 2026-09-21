import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { DashboardActivity } from "@/data/dashboard/overview";


interface RecentActivityProps {
    activities: DashboardActivity[];
}

export function RecentActivity({
    activities,
}: RecentActivityProps) {
    return (
        <Card>
            <CardHeader>
                <p className="text-sm text-muted-foreground">
                    Latest activity
                </p>

                <CardTitle>Recent picks</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="divide-y divide-border">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {activity.name}
                                </p>

                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                    Picked {activity.candidate} ·{" "}
                                    {activity.election}
                                </p>
                            </div>

                            <span className="shrink-0 text-xs text-muted-foreground">
                                {activity.time}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}