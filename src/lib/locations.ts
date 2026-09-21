import {
    fctAreaCouncils,
    nigeria,
    nigeriaFederalConstituencies,
    nigeriaSenatorialDistricts,
    nigeriaStateConstituencies,
} from "@/data/nigeria";

export function getStateById(stateId: string) {
    return nigeria.states.find((state) => state.id === stateId);
}

export function getLgasByState(stateId: string) {
    return nigeria.lgas.filter(
        (lga) => lga.stateId === stateId,
    );
}

export function getLgaById(lgaId: string) {
    return nigeria.lgas.find((lga) => lga.id === lgaId);
}

export function getWardsByLga(lgaId: string) {
    return nigeria.wards.filter(
        (ward) => ward.lgaId === lgaId,
    );
}

export function getWardById(wardId: string) {
    return nigeria.wards.find(
        (ward) => ward.id === wardId,
    );
}

export function getSenatorialDistrictsByState(
    stateId: string,
) {
    return nigeriaSenatorialDistricts.filter(
        (district) => district.stateId === stateId,
    );
}

export function getFederalConstituenciesByState(
    stateId: string,
) {
    return nigeriaFederalConstituencies.filter(
        (constituency) => constituency.stateId === stateId,
    );
}

export function getStateConstituenciesByState(
    stateId: string,
) {
    return nigeriaStateConstituencies.filter(
        (constituency) => constituency.stateId === stateId,
    );
}

export function getFctAreaCouncils() {
    return fctAreaCouncils;
}