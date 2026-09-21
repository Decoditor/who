import { presidentialCandidates } from "@/data/candidates/presidential";
import { parties } from "@/data/parties";
import type { CandidateResult, PickResult } from "@/types/voting";

export function buildCandidateResults(
    results: PickResult[],
    electionId: PickResult["electionId"],
): CandidateResult[] {
    const electionResults = results
        .filter(
            (result) =>
                result.electionId === electionId,
        )
        .sort((a, b) => b.picks - a.picks);

    const totalPicks = electionResults.reduce(
        (total, result) => total + result.picks,
        0,
    );

    return electionResults.flatMap(
        (result, index) => {
            const candidate = presidentialCandidates.find(
                (item) =>
                    item.id === result.candidateId,
            );

            if (!candidate) {
                return [];
            }

            const party = parties.find(
                (item) =>
                    item.id === candidate.partyId,
            );

            return [
                {
                    ...result,
                    candidate,
                    party,
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
                },
            ];
        },
    );
}