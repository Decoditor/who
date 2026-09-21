import type { ElectionType } from "@/types/election";
import { electionTypes } from "@/data/election";

export function getElectionConfig(election: ElectionType) {
    return electionTypes.find((item) => item.id === election);
}

export function getNextPickStep(election: ElectionType) {
    const config = getElectionConfig(election);

    if (!config) {
        return "/pick";
    }

    const needsLocation =
        config.requiresState ||
        config.requiresLga ||
        config.requiresWard ||
        config.requiresAreaCouncil ||
        config.requiresConstituency ||
        config.requiresSenatorialDistrict;

    if (needsLocation) {
        return "/pick/location";
    }

    return "/pick/candidate";
}