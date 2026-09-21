export interface NigerianState {
    id: string;
    name: string;
    code: string;
    isFct?: boolean;
}

export interface LocalGovernment {
    id: string;
    stateId: string;
    name: string;
}

export interface Ward {
    id: string;
    stateId: string;
    lgaId: string;
    name: string;
}

export interface SenatorialDistrict {
    id: string;
    stateId: string;
    name: string;
}

export interface FederalConstituency {
    id: string;
    stateId: string;
    name: string;
}

export interface StateConstituency {
    id: string;
    stateId: string;
    name: string;
}

export interface FctAreaCouncil {
    id: string;
    name: string;
}