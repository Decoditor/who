export type Position = "president" | "governor" | "senate";

export interface Candidate {
    id: string;
    name: string;
    party: string;
}

export interface PositionDetails {
    title: string;
    description: string;
    location: string;
}


export interface DashboardCandidate {
    candidateId: string;
    candidateName: string;
    party: string;
    endorsements: number;
}

export interface DashboardTrend {
    date: string;
    endorsements: number;
}

export interface DashboardStats {
    position: Position;
    state: string | null;
    totalEndorsements: number;
    changeSincePreviousUpdate: number;
    candidates: DashboardCandidate[];
    trend: DashboardTrend[];
    updatedAt: string;
}