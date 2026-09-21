import type {
    FederalConstituency,
    FctAreaCouncil,
    LocalGovernment,
    NigerianState,
    SenatorialDistrict,
    StateConstituency,
    Ward,
} from "@/types/location";

import locationData from "./locations.json";

interface RawWard {
    id: string;
    name: {
        local: string;
        en: string;
        slug: string;
    };
}

interface RawLga {
    id: string;
    name: {
        local: string;
        en: string;
        slug: string;
    };
    ward?: RawWard[];
}

interface RawState {
    id: string;
    name: {
        local: string;
        en: string;
        slug: string;
    };
    lga: RawLga[];
}

interface RawNigeriaData {
    _attribution?: string;
    data: RawState[];
}

const rawData = locationData as RawNigeriaData;

function createId(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const rawStates = rawData.data;

export const nigeriaStates: NigerianState[] = rawStates.map(
    (state) => ({
        id: createId(state.name.en),
        name: state.name.en,
        code: state.id,
        isFct:
            state.name.en === "Federal Capital Territory",
    }),
);

export const nigeriaLgas: LocalGovernment[] =
    rawStates.flatMap((state) => {
        const stateId = createId(state.name.en);

        return state.lga.map((lga) => ({
            id: lga.id.toLowerCase(),
            stateId,
            name: lga.name.en,
        }));
    });

export const nigeriaWards: Ward[] =
    rawStates.flatMap((state) => {
        const stateId = createId(state.name.en);

        return state.lga.flatMap((lga) => {
            const lgaId = lga.id?.toLowerCase();

            if (!lgaId || !Array.isArray(lga.ward)) {
                return [];
            }

            return lga.ward
                .filter(
                    (ward): ward is RawWard =>
                        Boolean(
                            ward &&
                            ward.id &&
                            ward.name &&
                            ward.name.en,
                        ),
                )
                .map((ward) => ({
                    id: ward.id.toLowerCase(),
                    stateId,
                    lgaId,
                    name: ward.name.en,
                }));
        });
    });

/**
 * Electoral districts are kept here as a separate central
 * collection so the rest of the application can use the
 * same location data source.
 *
 * These will be populated from the electoral constituency
 * dataset in the next data pass.
 */
export const nigeriaSenatorialDistricts: SenatorialDistrict[] = [];

export const nigeriaFederalConstituencies: FederalConstituency[] =
    [];

export const nigeriaStateConstituencies: StateConstituency[] =
    [];

/**
 * Federal Capital Territory Area Councils.
 */
export const fctAreaCouncils: FctAreaCouncil[] = [
    {
        id: "abuja-municipal",
        name: "Abuja Municipal Area Council",
    },
    {
        id: "abaji",
        name: "Abaji Area Council",
    },
    {
        id: "bwari",
        name: "Bwari Area Council",
    },
    {
        id: "gwagwalada",
        name: "Gwagwalada Area Council",
    },
    {
        id: "kuje",
        name: "Kuje Area Council",
    },
    {
        id: "kwali",
        name: "Kwali Area Council",
    },
];

/**
 * Central Nigeria location data.
 *
 * All location-related pages should consume this object
 * instead of importing individual datasets.
 */
export const nigeria = {
    states: nigeriaStates,
    lgas: nigeriaLgas,
    wards: nigeriaWards,
    senatorialDistricts: nigeriaSenatorialDistricts,
    federalConstituencies: nigeriaFederalConstituencies,
    stateConstituencies: nigeriaStateConstituencies,
    fctAreaCouncils,
};