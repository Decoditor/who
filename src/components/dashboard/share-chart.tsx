import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import type { DashboardCandidate } from "@/types";

interface EndorsementShareChartProps {
    candidates: DashboardCandidate[];
}

const colors = [
    "var(--green)",
    "var(--coral)",
    "var(--lime)",
];

export function EndorsementShareChart({
    candidates,
}: EndorsementShareChartProps) {
    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={candidates}
                        dataKey="endorsements"
                        nameKey="candidateName"
                        innerRadius={72}
                        outerRadius={105}
                        paddingAngle={2}
                    >
                        {candidates.map((candidate, index) => (
                            <Cell
                                key={candidate.candidateId}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
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
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}