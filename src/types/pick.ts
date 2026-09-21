import type { ElectionType } from "@/types/election";

export type ContactType = "email" | "phone";

export interface PickEntry {
    name: string;
    contactType: ContactType;
    contactValue: string;
}

export interface PickDraft extends PickEntry {
    election: ElectionType | null;

    stateId?: string;
    lgaId?: string;
    wardId?: string;

    constituencyId?: string;
    senatorialDistrictId?: string;
    areaCouncilId?: string;

    candidateId?: string;

    reason?: string;

    changesUsed: number;
}



import type { Candidate, Party } from "@/types/candidate";
import type { ElectionTypeConfig } from "@/types/election";

export type EndorsementCardTemplate =
    | "editorial"
    | "identity";

export interface EndorsementCardProps {
    candidate: Candidate;
    party?: Party;
    election: ElectionTypeConfig;
    locationParts?: string[];
    userName: string;
    reason?: string;
    template?: EndorsementCardTemplate;
}

export interface EndorsementCardDesignProps {
    candidate: Candidate;
    party?: Party;
    election: ElectionTypeConfig;
    locationParts: string[];
    userName: string;
    reason?: string;
}