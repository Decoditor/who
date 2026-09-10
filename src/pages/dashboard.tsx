import { useState } from "react";

import Disclaimer from "@/components/disclaimer";
import { CandidateComparisonChart } from "@/components/dashboard/compare-chart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSummary } from "@/components/dashboard/summary";
import { EndorsementShareChart } from "@/components/dashboard/share-chart";
import { EndorsementTrendChart } from "@/components/dashboard/trend-chart";
import { PositionTabs } from "@/components/dashboard/tabs";
import { StateSelector } from "@/components/dashboard/state-selector";
import { dashboardStats } from "@/constants";
import type { Position } from "@/types";

export default function Dashboard() {
    const [position, setPosition] =
        useState<Position>("president");

    const [state, setState] = useState("Oyo");

    const baseStats = dashboardStats[position];

    const stats = {
        ...baseStats,
        state: position === "president" ? null : state,
    };

    const locationLabel = stats.state ?? "Nigeria";

    return (
        <main className="min-h-svh bg-background">
            <DashboardHeader />

            <section className="mx-auto max-w-360 px-6 pb-16 pt-10 sm:px-10 lg:px-14 lg:pt-14">
                {/* Heading */}
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                            The conversation
                        </p>

                        <h1 className="mt-3 text-5xl font-bold leading-[0.92] tracking-tighter sm:text-6xl lg:text-7xl">
                            Who are Nigerians
                            <br />
                            backing?
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                            Explore endorsements shared by people on who.ng.
                            These figures represent our users, not an election
                            forecast.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="size-2 rounded-full bg-lime" />
                        Updated just now
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-12 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
                    <PositionTabs
                        value={position}
                        onChange={setPosition}
                    />

                    {position !== "president" && (
                        <StateSelector
                            value={state}
                            onChange={setState}
                        />
                    )}
                </div>

                {/* Main chart + stats */}
                <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-[1.5fr_0.5fr]">
                    <section className="bg-card p-5 sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                                    Endorsement activity
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                                    {locationLabel}
                                </h2>
                            </div>

                            <span className="text-xs text-muted-foreground">
                                Last 10 days
                            </span>
                        </div>

                        <div className="mt-6">
                            <EndorsementTrendChart data={stats.trend} />
                        </div>
                    </section>

                    <DashboardSummary stats={stats} />
                </div>

                {/* Candidate charts */}
                <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
                    <section className="bg-card p-5 sm:p-7">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                                Candidate comparison
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight">
                                Endorsements by candidate
                            </h2>
                        </div>

                        <div className="mt-6">
                            <CandidateComparisonChart
                                candidates={stats.candidates}
                            />
                        </div>
                    </section>

                    <section className="bg-card p-5 sm:p-7">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                                Share of endorsements
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight">
                                Current breakdown
                            </h2>
                        </div>

                        <div className="mt-6">
                            <EndorsementShareChart
                                candidates={stats.candidates}
                            />
                        </div>
                    </section>
                </div>

                {/* Candidate details */}
                <section className="mt-8">
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                            Breakdown
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight">
                            Candidate endorsements
                        </h2>
                    </div>

                    <div className="divide-y divide-border border-y border-border">
                        {stats.candidates
                            .slice()
                            .sort((a, b) => b.endorsements - a.endorsements)
                            .map((candidate, index) => {
                                const percentage =
                                    stats.totalEndorsements > 0
                                        ? Math.round(
                                            (candidate.endorsements /
                                                stats.totalEndorsements) *
                                            100,
                                        )
                                        : 0;

                                return (
                                    <div
                                        key={candidate.candidateId}
                                        className="flex items-center gap-4 py-5"
                                    >
                                        <span className="w-6 text-sm text-muted-foreground">
                                            {index + 1}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold">
                                                {candidate.candidateName}
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {candidate.party}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold">
                                                {candidate.endorsements.toLocaleString()}
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {percentage}%
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </section>

                {/* Disclaimer */}
                <div className="mt-10 max-w-2xl border-t border-border pt-8">
                    <Disclaimer />
                </div>
            </section>
        </main>
    );
}