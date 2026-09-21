import type { ElectionType } from "@/types/election";

export interface Party {
    id: string;
    name: string;
    abbreviation: string;
    logo?: string;
}

export interface Candidate {
    id: string;

    electionId: ElectionType;

    name: string;

    partyId: string;

    image?: string;
    imageSource?: string;

    stateId?: string;
    lgaId?: string;
    wardId?: string;

    constituencyId?: string;
    senatorialDistrictId?: string;
    areaCouncilId?: string;

    runningMateName?: string;

    isOfficial: boolean;
}