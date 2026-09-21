export type ElectionType =
    | "presidential"
    | "governorship"
    | "senate"
    | "house-of-representatives"
    | "state-assembly"
    | "local-government-chairman"
    | "local-government-councillor"
    | "fct-area-council-chairman"
    | "fct-area-councillor";

export type ElectionScope =
    | "national"
    | "state"
    | "senatorial-district"
    | "federal-constituency"
    | "state-constituency"
    | "lga"
    | "ward"
    | "fct-area-council";

export interface ElectionTypeConfig {
    id: ElectionType;
    name: string;
    shortName: string;
    description: string;
    scope: ElectionScope;

    requiresState: boolean;
    requiresLga: boolean;
    requiresWard: boolean;
    requiresAreaCouncil: boolean;
    requiresConstituency: boolean;
    requiresSenatorialDistrict: boolean;
}