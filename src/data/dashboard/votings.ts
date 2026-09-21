import type { ElectionType } from "@/types/election";

export interface DemoPickResult {
    candidateId: string;
    electionId: ElectionType;
    picks: number;
}

export const demoPickResults: DemoPickResult[] = [
    {
        candidateId: "pres-apc-bola-tinubu",
        electionId: "presidential",
        picks: 5240,
    },
    {
        candidateId: "pres-ndc-peter-obi",
        electionId: "presidential",
        picks: 5178,
    },
    {
        candidateId: "pres-adc-atiku-abubakar",
        electionId: "presidential",
        picks: 5024,
    },
    {
        candidateId: "pres-aac-omoyele-sowore",
        electionId: "presidential",
        picks: 4980,
    },
];