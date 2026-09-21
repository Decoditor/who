import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import LocationSelect from "@/components/pick/location";

import { getElectionConfig } from "@/lib/pick-flow";
import {
    getFederalConstituenciesByState,
    getLgasByState,
    getSenatorialDistrictsByState,
    getStateConstituenciesByState,
    getWardsByLga,
} from "@/lib/locations";

import {
    fctAreaCouncils,
    nigeriaStates,
} from "@/data/nigeria";

import type { ElectionType } from "@/types/election";
import type { PickDraft } from "@/types/pick";

const DRAFT_KEY = "who-ng-pick-draft";

export default function PickLocation() {
    const navigate = useNavigate();

    const [draft, setDraft] = useState<PickDraft | null>(
        null,
    );

    const [stateId, setStateId] = useState<string>();
    const [lgaId, setLgaId] = useState<string>();
    const [wardId, setWardId] = useState<string>();

    const [senatorialDistrictId, setSenatorialDistrictId] =
        useState<string>();

    const [constituencyId, setConstituencyId] =
        useState<string>();

    const [areaCouncilId, setAreaCouncilId] =
        useState<string>();

    useEffect(() => {
        const storedDraft = sessionStorage.getItem(DRAFT_KEY);

        if (!storedDraft) {
            navigate("/pick");
            return;
        }

        try {
            const parsedDraft = JSON.parse(
                storedDraft,
            ) as PickDraft;

            setDraft(parsedDraft);

            setStateId(parsedDraft.stateId);
            setLgaId(parsedDraft.lgaId);
            setWardId(parsedDraft.wardId);

            setSenatorialDistrictId(
                parsedDraft.senatorialDistrictId,
            );

            setConstituencyId(
                parsedDraft.constituencyId,
            );

            setAreaCouncilId(
                parsedDraft.areaCouncilId,
            );
        } catch {
            sessionStorage.removeItem(DRAFT_KEY);
            navigate("/pick");
        }
    }, [navigate]);

    const electionConfig = useMemo(() => {
        if (!draft?.election) {
            return undefined;
        }

        return getElectionConfig(
            draft.election as ElectionType,
        );
    }, [draft]);

    const lgas = useMemo(() => {
        if (!stateId) {
            return [];
        }

        return getLgasByState(stateId);
    }, [stateId]);

    const wards = useMemo(() => {
        if (!lgaId) {
            return [];
        }

        return getWardsByLga(lgaId);
    }, [lgaId]);

    const senatorialDistricts = useMemo(() => {
        if (!stateId) {
            return [];
        }

        return getSenatorialDistrictsByState(stateId);
    }, [stateId]);

    const federalConstituencies = useMemo(() => {
        if (!stateId) {
            return [];
        }

        return getFederalConstituenciesByState(stateId);
    }, [stateId]);

    const stateConstituencies = useMemo(() => {
        if (!stateId) {
            return [];
        }

        return getStateConstituenciesByState(stateId);
    }, [stateId]);

    if (!draft || !electionConfig) {
        return null;
    }

    const canContinue = (() => {
        if (electionConfig.requiresState && !stateId) {
            return false;
        }

        if (electionConfig.requiresLga && !lgaId) {
            return false;
        }

        if (electionConfig.requiresWard && !wardId) {
            return false;
        }

        if (
            electionConfig.requiresAreaCouncil &&
            !areaCouncilId
        ) {
            return false;
        }

        if (
            electionConfig.requiresSenatorialDistrict &&
            !senatorialDistrictId
        ) {
            return false;
        }

        if (
            electionConfig.requiresConstituency &&
            !constituencyId
        ) {
            return false;
        }

        return true;
    })();

    function handleStateChange(value: string | null) {
        const nextStateId = value || undefined;

        setStateId(nextStateId);

        setLgaId(undefined);
        setWardId(undefined);
        setSenatorialDistrictId(undefined);
        setConstituencyId(undefined);
    }

    function handleLgaChange(value: string | null) {
        const nextLgaId = value || undefined;

        setLgaId(nextLgaId);
        setWardId(undefined);
    }

    function handleContinue() {
        if (!canContinue || !draft) {
            return;
        }

        const updatedDraft: PickDraft = {
            name: draft.name,
            contactType: draft.contactType,
            contactValue: draft.contactValue,
            election: draft.election,
            changesUsed: draft.changesUsed,

            stateId,
            lgaId,
            wardId,
            constituencyId,
            senatorialDistrictId,
            areaCouncilId,

            candidateId: draft.candidateId,
            reason: draft.reason,
        };

        sessionStorage.setItem(
            DRAFT_KEY,
            JSON.stringify(updatedDraft),
        );

        navigate("/pick/candidate");
    }

    return (
        <div className="mx-auto w-full max-w-3xl flex-1 py-10 sm:py-14">
            <header className="mb-8 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/pick")}
                    className="gap-2"
                >
                    <ArrowLeft className="size-4" />
                    Back
                </Button>

                <span className="text-sm font-medium text-muted-foreground">
                    Step 2 of 3
                </span>
            </header>

            <section className="flex-1">
                <div className="mb-8 max-w-2xl">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-coral">
                        {electionConfig.shortName}
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Tell us where your pick is.
                    </h1>

                    <p className="mt-3 max-w-xl text-muted-foreground">
                        Choose the location or constituency
                        that matches the election you want to
                        endorse.
                    </p>
                </div>

                <div className="space-y-6">
                    {electionConfig.requiresState && (
                        <LocationSelect
                            label="State"
                            placeholder="Select your state"
                            value={stateId}
                            options={nigeriaStates.map(
                                (state) => ({
                                    id: state.id,
                                    name: state.name,
                                }),
                            )}
                            onValueChange={
                                handleStateChange
                            }
                        />
                    )}

                    {electionConfig.requiresLga && (
                        <LocationSelect
                            label="Local Government Area"
                            placeholder={
                                stateId
                                    ? "Select your LGA"
                                    : "Select a state first"
                            }
                            value={lgaId}
                            options={lgas.map((lga) => ({
                                id: lga.id,
                                name: lga.name,
                            }))}
                            onValueChange={
                                handleLgaChange
                            }
                            disabled={!stateId}
                        />
                    )}

                    {electionConfig.requiresWard && (
                        <LocationSelect
                            label="Ward"
                            placeholder={
                                lgaId
                                    ? "Select your ward"
                                    : "Select an LGA first"
                            }
                            value={wardId}
                            options={wards.map((ward) => ({
                                id: ward.id,
                                name: ward.name,
                            }))}
                            onValueChange={(value) =>
                                setWardId(
                                    value || undefined,
                                )
                            }
                            disabled={!lgaId}
                        />
                    )}

                    {electionConfig.requiresSenatorialDistrict && (
                        <LocationSelect
                            label="Senatorial District"
                            placeholder={
                                stateId
                                    ? "Select your senatorial district"
                                    : "Select a state first"
                            }
                            value={
                                senatorialDistrictId
                            }
                            options={senatorialDistricts.map(
                                (district) => ({
                                    id: district.id,
                                    name: district.name,
                                }),
                            )}
                            onValueChange={(value) =>
                                setSenatorialDistrictId(
                                    value || undefined,
                                )
                            }
                            disabled={!stateId}
                        />
                    )}

                    {electionConfig.requiresConstituency && (
                        <LocationSelect
                            label="Constituency"
                            placeholder={
                                stateId
                                    ? "Select your constituency"
                                    : "Select a state first"
                            }
                            value={constituencyId}
                            options={[
                                ...federalConstituencies,
                                ...stateConstituencies,
                            ].map(
                                (constituency) => ({
                                    id: constituency.id,
                                    name: constituency.name,
                                }),
                            )}
                            onValueChange={(value) =>
                                setConstituencyId(
                                    value || undefined,
                                )
                            }
                            disabled={!stateId}
                        />
                    )}

                    {electionConfig.requiresAreaCouncil && (
                        <LocationSelect
                            label="Area Council"
                            placeholder="Select your area council"
                            value={areaCouncilId}
                            options={fctAreaCouncils.map((council) => ({
                                id: council.id,
                                name: council.name,
                            }))}
                            onValueChange={(value) =>
                                setAreaCouncilId(
                                    value || undefined,
                                )
                            }
                        />
                    )}
                </div>
            </section>

            <div className="sticky bottom-0 mt-8 border-t border-border bg-background py-4">
                <Button
                    size="lg"
                    className="w-full gap-2"
                    disabled={!canContinue}
                    onClick={handleContinue}
                >
                    Continue
                    <ArrowRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}