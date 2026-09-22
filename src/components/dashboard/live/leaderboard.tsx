import { AnimatePresence, motion } from "motion/react";
import {
    ArrowDown,
    ArrowUp,
    Minus,
} from "lucide-react";

import type { CandidateResult } from "@/types/voting";

export interface VoteReaction {
    id: number;
    candidateId: string;
}

interface LiveLeaderboardProps {
    results: CandidateResult[];
    previousRanks: Record<string, number>;
    reactions: VoteReaction[];
}

export function LiveLeaderboard({
    results,
    previousRanks,
    reactions,
}: LiveLeaderboardProps) {
    return (
        <div className="space-y-3">
            <AnimatePresence initial={false}>
                {results.map((result) => {
                    const previousRank =
                        previousRanks[result.candidate.id];

                    const movement =
                        previousRank === undefined
                            ? "same"
                            : result.rank < previousRank
                                ? "up"
                                : result.rank > previousRank
                                    ? "down"
                                    : "same";

                    const candidateReactions =
                        reactions.filter(
                            (reaction) =>
                                reaction.candidateId ===
                                result.candidate.id,
                        );

                    return (
                        <motion.div
                            key={result.candidate.id}
                            layout
                            animate={{
                                scale:
                                    movement === "up"
                                        ? [1, 1.015, 1]
                                        : 1,
                            }}
                            className="group relative overflow-visible rounded-2xl border border-border bg-card px-3 py-3 shadow-sm transition-shadow hover:shadow-md sm:px-4 sm:py-4"
                        >
                            <div className="flex items-center gap-3 sm:gap-5">
                                {/* Rank */}
                                <div className="flex w-12 shrink-0 items-center gap-1.5 sm:w-16">
                                    <motion.span
                                        key={result.rank}
                                        initial={{
                                            scale: 1.5,
                                            y: movement === "up" ? 8 : -8,
                                            opacity: 0.4,
                                        }}
                                        animate={{
                                            scale: 1,
                                            y: 0,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 24,
                                        }}
                                        className={`text-2xl font-black tabular-nums tracking-tight sm:text-3xl ${result.rank === 1
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        {String(
                                            result.rank,
                                        ).padStart(2, "0")}
                                    </motion.span>

                                    <MovementIndicator
                                        movement={movement}
                                    />
                                </div>

                                {/* Candidate */}
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div className="relative size-11 shrink-0 sm:size-14">
                                        <div className="size-full overflow-hidden rounded-xl bg-muted ring-1 ring-border">
                                            <img
                                                src={
                                                    result.candidate.image ??
                                                    "/candidates/default.png"
                                                }
                                                alt={
                                                    result.candidate
                                                        .name
                                                }
                                                className="size-full object-cover"
                                            />
                                        </div>

                                        {result.rank <= 3 && (
                                            <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-card bg-primary text-[9px] font-bold text-primary-foreground">
                                                {result.rank}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold sm:text-base">
                                            {
                                                result
                                                    .candidate
                                                    .name
                                            }
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                            {result.party
                                                ?.abbreviation ??
                                                result.party
                                                    ?.name ??
                                                "Independent"}
                                        </p>
                                    </div>
                                </div>

                                {/* Vote count */}
                                <div className="relative shrink-0 text-right">
                                    <AnimatePresence>
                                        {candidateReactions.map(
                                            (reaction) => (
                                                <motion.span
                                                    key={
                                                        reaction.id
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -5,
                                                        y: 4,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: [
                                                            0,
                                                            1,
                                                            1,
                                                            0,
                                                        ],
                                                        x: 8,
                                                        y: -58,
                                                        scale: [
                                                            0.8,
                                                            1.1,
                                                            1,
                                                        ],
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 1.1,
                                                        ease: "easeOut",
                                                    }}
                                                    className="pointer-events-none absolute bottom-full right-0 whitespace-nowrap text-sm font-black text-primary"
                                                >
                                                    +1
                                                </motion.span>
                                            ),
                                        )}
                                    </AnimatePresence>

                                    <motion.p
                                        key={result.picks}
                                        initial={{
                                            scale: 1.15,
                                        }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 0.12,
                                        }}
                                        className="text-lg font-black tabular-nums tracking-tight sm:text-xl"
                                    >
                                        {result.picks.toLocaleString()}
                                    </motion.p>

                                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                        picks
                                    </p>
                                </div>

                                {/* Percentage */}
                                <div className="hidden w-20 shrink-0 text-right sm:block">
                                    <motion.p
                                        key={
                                            result.percentage
                                        }
                                        initial={{
                                            opacity: 0.4,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        className="text-sm font-bold tabular-nums"
                                    >
                                        {
                                            result.percentage
                                        }
                                        %
                                    </motion.p>

                                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                        share
                                    </p>
                                </div>
                            </div>

                            {/* Race bar */}
                            <div className="mt-3 pl-12 sm:pl-16">
                                <div className="h-1 overflow-hidden rounded-full bg-muted">
                                    <motion.div
                                        layout
                                        className={`h-full rounded-full ${result.rank === 1
                                            ? "bg-primary"
                                            : "bg-primary/50"
                                            }`}
                                        animate={{
                                            width: `${Math.min(
                                                result.percentage,
                                                100,
                                            )}%`,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

function MovementIndicator({
    movement,
}: {
    movement: "up" | "down" | "same";
}) {
    if (movement === "up") {
        return (
            <motion.span
                initial={{
                    opacity: 0,
                    y: 5,
                    scale: 0.7,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                className="text-primary"
            >
                <ArrowUp className="size-3.5" />
            </motion.span>
        );
    }

    if (movement === "down") {
        return (
            <motion.span
                initial={{
                    opacity: 0,
                    y: -5,
                    scale: 0.7,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                className="text-muted-foreground"
            >
                <ArrowDown className="size-3.5" />
            </motion.span>
        );
    }

    return (
        <Minus className="size-3 text-muted-foreground" />
    );
}