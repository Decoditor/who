import { parties } from "@/data/parties";
import { presidentialCandidates } from "./presidential";
import type { DemoPickResult } from "../dashboard/votings";

export function getCandidateById(
    candidateId: string,
) {
    return presidentialCandidates.find(
        (candidate) => candidate.id === candidateId,
    );
}

export function getPartyById(
    partyId: string,
) {
    return parties.find(
        (party) => party.id === partyId,
    );
}

export function getCandidateParty(
    candidateId: string,
) {
    const candidate = getCandidateById(candidateId);

    if (!candidate) {
        return undefined;
    }

    return getPartyById(candidate.partyId);
}

export function getElectionResults(
    results: DemoPickResult[],
    electionId: DemoPickResult["electionId"],
) {
    return results
        .filter(
            (result) =>
                result.electionId === electionId,
        )
        .sort((a, b) => b.picks - a.picks);
}