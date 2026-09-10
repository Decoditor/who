import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { DashboardTrend } from "@/types";

interface EndorsementTrendChartProps {
    data: DashboardTrend[];
}

export function EndorsementTrendChart({
    data,
}: EndorsementTrendChartProps) {
    return (
        <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="currentColor"
                        className="text-border"
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickFormatter={(value) =>
                            value >= 1000
                                ? `${Math.round(value / 1000)}k`
                                : value
                        }
                    />

                    <Tooltip
                        cursor={{
                            stroke: "currentColor",
                            strokeDasharray: "4 4",
                        }}
                        contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            background: "var(--card)",
                            color: "var(--card-foreground)",
                        }}
                        formatter={(value) => [
                            Number(value).toLocaleString(),
                            "Endorsements",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="endorsements"
                        stroke="var(--green)"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{
                            r: 5,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}