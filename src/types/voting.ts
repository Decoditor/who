import type { Candidate, Party } from "@/types/candidate";
import type { ElectionType } from "@/types/election";

export interface PickResult {
    candidateId: string;
    electionId: ElectionType;
    picks: number;
}

export interface CandidateResult extends PickResult {
    candidate: Candidate;
    party?: Party;
    rank: number;
    percentage: number;
}