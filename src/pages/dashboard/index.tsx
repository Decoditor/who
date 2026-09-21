import { ArrowUpRight, Radio } from "lucide-react";
import { Link } from "react-router-dom";

import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TopCandidates } from "@/components/dashboard/top-candidates";

import { routes } from "@/routes/routes";
import { dashboardActivity, dashboardCandidates, dashboardMetrics } from "@/data/dashboard/overview";
import { MetricCard } from "@/components/dashboard/metric";
import { PicksChart } from "@/components/dashboard/picks";

export default function Dashboard() {
    return (
        <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="space-y-8">
                <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-medium text-primary">
                            Overview
                        </p>

                        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Good evening, AbdulSamad.
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                            Here's what's happening across
                            Who.ng today.
                        </p>
                    </div>

                    <Link
                        to={routes.dashboardLive}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Radio className="size-4" />
                        View live
                    </Link>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {dashboardMetrics.map((metric) => (
                        <MetricCard
                            key={metric.label}
                            metric={metric}
                        />
                    ))}
                </section>

                <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
                    <PicksChart />

                    <TopCandidates
                        candidates={dashboardCandidates}
                    />
                </section>

                <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
                    <RecentActivity
                        activities={dashboardActivity}
                    />

                    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground">
                        <div className="relative z-10">
                            <p className="text-sm font-medium opacity-80">
                                Live election
                            </p>

                            <h2 className="mt-2 max-w-sm text-2xl font-semibold tracking-tight">
                                Presidential picks are
                                happening now.
                            </h2>

                            <p className="mt-3 max-w-sm text-sm opacity-80">
                                See how people are picking in
                                real time.
                            </p>

                            <Link
                                to={routes.dashboardLive}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-sm font-medium text-foreground"
                            >
                                Open live dashboard
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>

                        <div className="absolute -right-12 -top-12 size-40 rounded-full border-24 border-primary-foreground/10" />

                        <div className="absolute -bottom-16 right-10 size-48 rounded-full border-32 border-primary-foreground/5" />
                    </div>
                </section>
            </div>
        </div>
    );
}