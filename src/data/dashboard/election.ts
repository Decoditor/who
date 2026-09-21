import type { ElectionType } from "@/types/election";

export type ElectionStatus = "active" | "upcoming" | "completed";

export interface ElectionConfig {
    id: ElectionType;
    name: string;
    shortName: string;
    description: string;
    scope: string;
    status: ElectionStatus;
    year: number;
    candidateCount: number;
}

export const elections: ElectionConfig[] = [
    {
        id: "presidential",
        name: "Presidential Election",
        shortName: "Presidential",
        description: "Election for the President of Nigeria.",
        scope: "Nigeria",
        status: "active",
        year: 2027,
        candidateCount: 18,
    },
    {
        id: "governorship",
        name: "Governorship Election",
        shortName: "Governorship",
        description: "Election for State Governors.",
        scope: "States",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "senate",
        name: "Senate Election",
        shortName: "Senate",
        description: "Election for members of the Senate.",
        scope: "Senatorial Districts",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "house-of-representatives",
        name: "House of Representatives Election",
        shortName: "House of Representatives",
        description: "Election for members of the House of Representatives.",
        scope: "Federal Constituencies",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "state-assembly",
        name: "State Assembly Election",
        shortName: "State Assembly",
        description: "Election for members of State Houses of Assembly.",
        scope: "State Constituencies",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "local-government-chairman",
        name: "Local Government Chairman Election",
        shortName: "LG Chairman",
        description: "Election for Local Government Chairmen.",
        scope: "Local Governments",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "local-government-councillor",
        name: "Local Government Councillor Election",
        shortName: "LG Councillor",
        description: "Election for Local Government Councillors.",
        scope: "Wards",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "fct-area-council-chairman",
        name: "FCT Area Council Chairman Election",
        shortName: "FCT Area Council Chairman",
        description: "Election for FCT Area Council Chairmen.",
        scope: "FCT Area Councils",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
    {
        id: "fct-area-councillor",
        name: "FCT Area Council Councillor Election",
        shortName: "FCT Area Councillor",
        description: "Election for FCT Area Council Councillors.",
        scope: "FCT Wards",
        status: "upcoming",
        year: 2027,
        candidateCount: 0,
    },
];