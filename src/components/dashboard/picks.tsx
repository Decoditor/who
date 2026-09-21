import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const data = [
    { day: "Mon", picks: 920 },
    { day: "Tue", picks: 1180 },
    { day: "Wed", picks: 1040 },
    { day: "Thu", picks: 1490 },
    { day: "Fri", picks: 1320 },
    { day: "Sat", picks: 1740 },
    { day: "Sun", picks: 1820 },
];

export function PicksChart() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Activity
                    </p>
                    <CardTitle className="mt-1 text-xl">
                        Picks this week
                    </CardTitle>
                </div>

                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    Last 7 days
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-72 w-full">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <AreaChart
                            data={data}
                            margin={{
                                top: 8,
                                right: 8,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="4 4"
                            />

                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="picks"
                                stroke="var(--color-primary)"
                                fill="var(--color-primary)"
                                fillOpacity={0.12}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}