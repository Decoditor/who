import { buildCandidateResults } from "@/lib/voting";
import { demoPickResults } from "./votings";
export interface DashboardMetric {
    label: string;
    value: string;
    change: string;
    description: string;
}

export interface DashboardActivity {
    id: string;
    name: string;
    candidate: string;
    election: string;
    time: string;
}

export const dashboardCandidates =
    buildCandidateResults(
        demoPickResults,
        "presidential",
    );

export const dashboardMetrics: DashboardMetric[] = [
    {
        label: "Total Picks",
        value: "18,492",
        change: "+12.8%",
        description: "compared with last week",
    },
    {
        label: "Picks Today",
        value: "1,284",
        change: "+8.4%",
        description: "from yesterday",
    },
    {
        label: "Live Now",
        value: "6",
        change: "+2",
        description: "active elections",
    },
    {
        label: "Candidates",
        value: "428",
        change: "+14",
        description: "this election cycle",
    },
];

export const dashboardActivity: DashboardActivity[] = [
    {
        id: "activity-1",
        name: "Amina Yusuf",
        candidate: "Candidate A",
        election: "Presidential",
        time: "2 min ago",
    },
    {
        id: "activity-2",
        name: "Ibrahim Musa",
        candidate: "Candidate B",
        election: "Governorship",
        time: "5 min ago",
    },
    {
        id: "activity-3",
        name: "David Okoro",
        candidate: "Candidate C",
        election: "Senate",
        time: "8 min ago",
    },
    {
        id: "activity-4",
        name: "Fatima Bello",
        candidate: "Candidate A",
        election: "Presidential",
        time: "11 min ago",
    },
    {
        id: "activity-5",
        name: "Samuel Ade",
        candidate: "Candidate D",
        election: "House of Representatives",
        time: "14 min ago",
    },
];

// export const dashboardCandidates: DashboardCandidate[] = [
//     {
//         candidate: {
//             id: "candidate-a",
//             electionId: "presidential",
//             name: "Candidate A",
//             partyId: "party-a",
//             image: "/candidates/tinubu.jpg",
//             isOfficial: true,
//         },
//         party: "Party A",
//         picks: 5240,
//         percentage: 28.3,
//     },
//     {
//         candidate: {
//             id: "candidate-b",
//             electionId: "presidential",
//             name: "Candidate B",
//             partyId: "party-b",
//             image: "/candidates/obi.jpg",
//             isOfficial: true,
//         },
//         party: "Party B",
//         picks: 4678,
//         percentage: 25.3,
//     },
//     {
//         candidate: {
//             id: "candidate-c",
//             electionId: "presidential",
//             name: "Candidate C",
//             partyId: "party-c",
//             image: "/candidates/atiku.jpg",
//             isOfficial: true,
//         },
//         party: "Party C",
//         picks: 3924,
//         percentage: 21.2,
//     },
// ];