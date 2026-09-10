import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { DashboardCandidate } from "@/types";

interface CandidateComparisonChartProps {
    candidates: DashboardCandidate[];
}

export function CandidateComparisonChart({
    candidates,
}: CandidateComparisonChartProps) {
    const data = candidates.map((candidate) => ({
        name: candidate.candidateName,
        endorsements: candidate.endorsements,
    }));

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 0,
                        right: 10,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        horizontal={false}
                        stroke="currentColor"
                        className="text-border"
                    />

                    <XAxis
                        type="number"
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

                    <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-foreground"
                    />

                    <Tooltip
                        cursor={{
                            fill: "currentColor",
                            opacity: 0.04,
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

                    <Bar
                        dataKey="endorsements"
                        fill="var(--green)"
                        radius={[0, 4, 4, 0]}
                        barSize={28}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}