import type { Candidate, DashboardStats, Position, PositionDetails } from "./types";

export const candidatesByPosition: Record<Position, Candidate[]> = {
    president: [
        {
            id: "pres-001",
            name: "Adebayo Example",
            party: "Example Party",
        },
        {
            id: "pres-002",
            name: "Chinedu Example",
            party: "National Example Party",
        },
        {
            id: "pres-003",
            name: "Ibrahim Example",
            party: "People's Example Party",
        },
    ],

    governor: [
        {
            id: "gov-001",
            name: "Tunde Example",
            party: "Example Party",
        },
        {
            id: "gov-002",
            name: "Kemi Example",
            party: "National Example Party",
        },
        {
            id: "gov-003",
            name: "Musa Example",
            party: "People's Example Party",
        },
    ],

    senate: [
        {
            id: "sen-001",
            name: "Abdul Example",
            party: "Example Party",
        },
        {
            id: "sen-002",
            name: "David Example",
            party: "National Example Party",
        },
        {
            id: "sen-003",
            name: "Fatima Example",
            party: "People's Example Party",
        },
    ],
};

export const positions: Record<Position, PositionDetails> = {
    president: {
        title: "President",
        description: "Choose the presidential candidate you're backing.",
        location: "Nigeria",
    },
    governor: {
        title: "Governor",
        description: "Choose the candidate you're backing for governor.",
        location: "Your state",
    },
    senate: {
        title: "Senate",
        description: "Choose the candidate you're backing for the Senate.",
        location: "Your state",
    },
};

export function isPosition(
    value: string | undefined,
): value is Position {
    return value === "president" ||
        value === "governor" ||
        value === "senate";
}

// DASHBOARD


const presidentStats: DashboardStats = {
    position: "president",
    state: null,
    totalEndorsements: 12480,
    changeSincePreviousUpdate: 248,
    updatedAt: "2026-09-10T08:00:00Z",

    trend: [
        { date: "Sep 1", endorsements: 8200 },
        { date: "Sep 2", endorsements: 8650 },
        { date: "Sep 3", endorsements: 9010 },
        { date: "Sep 4", endorsements: 9440 },
        { date: "Sep 5", endorsements: 10120 },
        { date: "Sep 6", endorsements: 10840 },
        { date: "Sep 7", endorsements: 11280 },
        { date: "Sep 8", endorsements: 11720 },
        { date: "Sep 9", endorsements: 12232 },
        { date: "Sep 10", endorsements: 12480 },
    ],

    candidates: [
        {
            candidateId: "pres-001",
            candidateName: "Adebayo Example",
            party: "Example Party",
            endorsements: 4820,
        },
        {
            candidateId: "pres-002",
            candidateName: "Chinedu Example",
            party: "National Example Party",
            endorsements: 4210,
        },
        {
            candidateId: "pres-003",
            candidateName: "Ibrahim Example",
            party: "People's Example Party",
            endorsements: 3450,
        },
    ],
};

const governorStats: DashboardStats = {
    position: "governor",
    state: "Oyo",
    totalEndorsements: 3860,
    changeSincePreviousUpdate: 76,
    updatedAt: "2026-09-10T08:00:00Z",

    trend: [
        { date: "Sep 1", endorsements: 2510 },
        { date: "Sep 2", endorsements: 2680 },
        { date: "Sep 3", endorsements: 2810 },
        { date: "Sep 4", endorsements: 2950 },
        { date: "Sep 5", endorsements: 3170 },
        { date: "Sep 6", endorsements: 3310 },
        { date: "Sep 7", endorsements: 3450 },
        { date: "Sep 8", endorsements: 3570 },
        { date: "Sep 9", endorsements: 3784 },
        { date: "Sep 10", endorsements: 3860 },
    ],

    candidates: [
        {
            candidateId: "gov-001",
            candidateName: "Tunde Example",
            party: "Example Party",
            endorsements: 1540,
        },
        {
            candidateId: "gov-002",
            candidateName: "Kemi Example",
            party: "National Example Party",
            endorsements: 1320,
        },
        {
            candidateId: "gov-003",
            candidateName: "Musa Example",
            party: "People's Example Party",
            endorsements: 1000,
        },
    ],
};

const senateStats: DashboardStats = {
    position: "senate",
    state: "Oyo",
    totalEndorsements: 2410,
    changeSincePreviousUpdate: 42,
    updatedAt: "2026-09-10T08:00:00Z",

    trend: [
        { date: "Sep 1", endorsements: 1540 },
        { date: "Sep 2", endorsements: 1670 },
        { date: "Sep 3", endorsements: 1740 },
        { date: "Sep 4", endorsements: 1860 },
        { date: "Sep 5", endorsements: 1990 },
        { date: "Sep 6", endorsements: 2080 },
        { date: "Sep 7", endorsements: 2160 },
        { date: "Sep 8", endorsements: 2250 },
        { date: "Sep 9", endorsements: 2368 },
        { date: "Sep 10", endorsements: 2410 },
    ],

    candidates: [
        {
            candidateId: "sen-001",
            candidateName: "Abdul Example",
            party: "Example Party",
            endorsements: 980,
        },
        {
            candidateId: "sen-002",
            candidateName: "David Example",
            party: "National Example Party",
            endorsements: 810,
        },
        {
            candidateId: "sen-003",
            candidateName: "Fatima Example",
            party: "People's Example Party",
            endorsements: 620,
        },
    ],
};

export const dashboardStats: Record<Position, DashboardStats> = {
    president: presidentStats,
    governor: governorStats,
    senate: senateStats,
};