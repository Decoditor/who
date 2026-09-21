import { useEffect, useMemo, useRef, useState } from "react";

import { demoPickResults } from "@/data/dashboard/votings";
import { buildCandidateResults } from "@/lib/voting";
import type { CandidateResult } from "@/types/voting";

export interface VoteReaction {
    id: number;
    candidateId: string;
}

const INITIAL_RESULTS = buildCandidateResults(
    demoPickResults,
    "presidential",
);

const FAST_VOTE_INTERVAL = 180;
const SLOW_VOTE_INTERVAL = 1400;
const REACTION_DURATION = 1000;

export function useLiveRace() {
    const [results, setResults] =
        useState<CandidateResult[]>(INITIAL_RESULTS);

    const [reactions, setReactions] = useState<
        VoteReaction[]
    >([]);

    const [previousRanks, setPreviousRanks] =
        useState<Record<string, number>>(
            createRankMap(INITIAL_RESULTS),
        );

    const racerOrder = useMemo(
        () =>
            INITIAL_RESULTS.map(
                (result) => result.candidate.id,
            ).reverse(),
        [],
    );

    const racerIndex = useRef(0);
    const reactionId = useRef(0);
    const lastSlowVote = useRef(Date.now());
    const previousResults = useRef(INITIAL_RESULTS);

    const rankedResults = useMemo(
        () =>
            [...results].sort(
                (a, b) => b.picks - a.picks,
            ),
        [results],
    );

    useEffect(() => {
        const timer = window.setInterval(() => {
            setResults((currentResults) => {
                if (currentResults.length < 2) {
                    return currentResults;
                }

                const currentRanked = [...currentResults].sort(
                    (a, b) => b.picks - a.picks,
                );

                const fastRacerId =
                    racerOrder[racerIndex.current];

                const fastRacer = currentRanked.find(
                    (result) =>
                        result.candidate.id ===
                        fastRacerId,
                );

                if (!fastRacer) {
                    return currentResults;
                }

                const now = Date.now();

                const slowVoteReady =
                    now - lastSlowVote.current >=
                    SLOW_VOTE_INTERVAL;

                const voteCandidateIds = [
                    fastRacerId,
                ];

                const updatedResults =
                    currentResults.map((result) => {
                        if (
                            result.candidate.id ===
                            fastRacerId
                        ) {
                            return {
                                ...result,
                                picks: result.picks + 1,
                            };
                        }

                        if (slowVoteReady) {
                            voteCandidateIds.push(
                                result.candidate.id,
                            );

                            return {
                                ...result,
                                picks: result.picks + 1,
                            };
                        }

                        return result;
                    });

                if (slowVoteReady) {
                    lastSlowVote.current = now;
                }

                reactionId.current += 1;

                const newReactions =
                    voteCandidateIds.map(
                        (candidateId) => ({
                            id: reactionId.current++,
                            candidateId,
                        }),
                    );

                setReactions((current) => [
                    ...current,
                    ...newReactions,
                ]);

                const rebuiltResults =
                    rebuildResults(updatedResults);

                setPreviousRanks(
                    createRankMap(
                        previousResults.current,
                    ),
                );

                previousResults.current =
                    rebuiltResults;

                const updatedFastRacer =
                    rebuiltResults.find(
                        (result) =>
                            result.candidate.id ===
                            fastRacerId,
                    );

                if (
                    updatedFastRacer?.rank === 1
                ) {
                    racerIndex.current =
                        (racerIndex.current + 1) %
                        racerOrder.length;
                }

                return rebuiltResults;
            });
        }, FAST_VOTE_INTERVAL);

        return () => window.clearInterval(timer);
    }, [racerOrder]);

    useEffect(() => {
        if (!reactions.length) {
            return;
        }

        const timer = window.setTimeout(() => {
            setReactions((current) =>
                current.filter(
                    (reaction) =>
                        Date.now() -
                        reaction.id <
                        REACTION_DURATION,
                ),
            );
        }, REACTION_DURATION);

        return () => window.clearTimeout(timer);
    }, [reactions]);

    const totalPicks = rankedResults.reduce(
        (total, result) => total + result.picks,
        0,
    );

    return {
        results: rankedResults,
        reactions,
        previousRanks,
        totalPicks,
    };
}

function rebuildResults(
    results: CandidateResult[],
): CandidateResult[] {
    const totalPicks = results.reduce(
        (total, result) => total + result.picks,
        0,
    );

    return [...results]
        .sort((a, b) => b.picks - a.picks)
        .map((result, index) => ({
            ...result,
            rank: index + 1,
            percentage:
                totalPicks > 0
                    ? Number(
                        (
                            (result.picks /
                                totalPicks) *
                            100
                        ).toFixed(1),
                    )
                    : 0,
        }));
}

function createRankMap(
    results: CandidateResult[],
): Record<string, number> {
    return Object.fromEntries(
        results.map((result) => [
            result.candidate.id,
            result.rank,
        ]),
    );
}