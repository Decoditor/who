import { ArrowUpRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { CandidateResult } from "@/types/voting";


interface TopCandidatesProps {
    candidates: CandidateResult[];
}

export function TopCandidates({
    candidates,
}: TopCandidatesProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Presidential
                    </p>
                    <CardTitle className="mt-1">
                        Top picks
                    </CardTitle>
                </div>

                <ArrowUpRight className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-4">
                {candidates.map((item, index) => (
                    <div
                        key={item.candidate.id}
                        className="flex items-center gap-3"
                    >
                        <span className="w-5 text-sm font-semibold text-muted-foreground">
                            {index + 1}
                        </span>

                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                            <img
                                src={
                                    item.candidate.image ??
                                    "/candidates/default.jpg"
                                }
                                alt={item.candidate.name}
                                className="size-full object-cover"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                {item.candidate.name}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                                {item.party?.abbreviation ??
                                    item.party?.name ??
                                    "Independent"}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-semibold">
                                {item.percentage}%
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {item.picks.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}