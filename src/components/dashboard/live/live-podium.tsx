import { motion } from "motion/react";

import type { CandidateResult } from "@/types/voting";

interface LivePodiumProps {
    results: CandidateResult[];
}

interface PodiumCandidateProps {
    result: CandidateResult;
    featured?: boolean;
}

function PodiumCandidate({
    result,
    featured = false,
}: PodiumCandidateProps) {
    return (
        <motion.div
            layout
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                },
            }}
            className={`relative flex min-w-0 flex-col items-center text-center ${featured
                ? "z-10"
                : "z-0"
                }`}
        >
            <div
                className={`relative ${featured
                    ? "size-24 sm:size-36 lg:size-44"
                    : "size-18 sm:size-28 lg:size-32"
                    }`}
            >
                <motion.div
                    layout
                    className={`size-full overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-lg ${featured
                        ? "ring-2 ring-primary/20"
                        : ""
                        }`}
                >
                    <img
                        src={
                            result.candidate.image ??
                            "/candidates/default.jpg"
                        }
                        alt={result.candidate.name}
                        className="size-full object-cover"
                    />
                </motion.div>

                <motion.div
                    layout
                    className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-primary font-bold text-primary-foreground shadow-md ${featured
                        ? "size-10 text-base sm:size-12 sm:text-lg"
                        : "size-8 text-sm sm:size-10 sm:text-base"
                        }`}
                >
                    {result.rank}
                </motion.div>
            </div>

            <div
                className={`mt-6 min-w-0 ${featured
                    ? "w-32 sm:w-44"
                    : "w-24 sm:w-36"
                    }`}
            >
                <p
                    className={`truncate font-semibold ${featured
                        ? "text-sm sm:text-lg"
                        : "text-xs sm:text-sm"
                        }`}
                >
                    {result.candidate.name}
                </p>

                <p className="mt-1 truncate text-[11px] text-muted-foreground sm:text-xs">
                    {result.party?.abbreviation ??
                        result.party?.name ??
                        "Independent"}
                </p>

                <div className="mt-3">
                    <motion.p
                        key={result.picks}
                        initial={{
                            scale: 1.08,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.12,
                        }}
                        className={`font-bold tabular-nums tracking-tight ${featured
                            ? "text-xl sm:text-2xl"
                            : "text-base sm:text-xl"
                            }`}
                    >
                        {result.picks.toLocaleString()}
                    </motion.p>

                    <p className="text-[10px] text-muted-foreground sm:text-xs">
                        {result.percentage}% of picks
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function LivePodium({
    results,
}: LivePodiumProps) {
    const first = results[0];
    const second = results[1];
    const third = results[2];

    if (!first) {
        return (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No live results available.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative px-3 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10">
                <div className="pointer-events-none absolute left-1/2 top-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 sm:size-80" />

                <div className="relative mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                        Live race
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                        Who's leading?
                    </h2>
                </div>

                <div className="relative mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] items-end gap-2 sm:gap-6 lg:gap-10">
                    {second ? (
                        <PodiumCandidate
                            result={second}
                        />
                    ) : (
                        <div />
                    )}

                    <PodiumCandidate
                        result={first}
                        featured
                    />

                    {third ? (
                        <PodiumCandidate
                            result={third}
                        />
                    ) : (
                        <div />
                    )}
                </div>
            </div>

            <div className="border-t border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
                Demo data · rankings update continuously
            </div>
        </div>
    );
}