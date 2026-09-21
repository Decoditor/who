import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import FingerprintSelector from "@/components/pick/fingerprint";
import { ValidationErrorDialog } from "@/components/error-modal";

import { electionTypes } from "@/data/election";
import { parties } from "@/data/parties";

import {
    getFederalConstituenciesByState,
    getFctAreaCouncils,
    getLgaById,
    getSenatorialDistrictsByState,
    getStateById,
    getStateConstituenciesByState,
    getWardById,
} from "@/lib/locations";

import type { Candidate as CandidateType } from "@/types/candidate";
import type { PickDraft } from "@/types/pick";
import { presidentialCandidates } from "@/data/candidates/presidential";

const PICK_DRAFT_KEY = "who-ng-pick-draft";

function getParty(partyId: string) {
    return parties.find((party) => party.id === partyId);
}

function getCandidateLocation(draft: PickDraft) {
    const parts: string[] = [];

    if (draft.stateId) {
        const state = getStateById(draft.stateId);

        if (state) {
            parts.push(state.name);
        }
    }

    if (draft.lgaId) {
        const lga = getLgaById(draft.lgaId);

        if (lga) {
            parts.push(lga.name);
        }
    }

    if (draft.wardId) {
        const ward = getWardById(draft.wardId);

        if (ward) {
            parts.push(ward.name);
        }
    }

    if (draft.senatorialDistrictId && draft.stateId) {
        const district = getSenatorialDistrictsByState(
            draft.stateId,
        ).find(
            (item) => item.id === draft.senatorialDistrictId,
        );

        if (district) {
            parts.push(district.name);
        }
    }

    if (draft.constituencyId && draft.stateId) {
        const federalConstituency =
            getFederalConstituenciesByState(
                draft.stateId,
            ).find(
                (item) => item.id === draft.constituencyId,
            );

        const stateConstituency =
            getStateConstituenciesByState(
                draft.stateId,
            ).find(
                (item) => item.id === draft.constituencyId,
            );

        const constituency =
            federalConstituency ?? stateConstituency;

        if (constituency) {
            parts.push(constituency.name);
        }
    }

    if (draft.areaCouncilId) {
        const areaCouncil = getFctAreaCouncils().find(
            (item) => item.id === draft.areaCouncilId,
        );

        if (areaCouncil) {
            parts.push(areaCouncil.name);
        }
    }

    return parts;
}

function candidateMatchesDraft(
    candidate: CandidateType,
    draft: PickDraft,
) {
    if (candidate.electionId !== draft.election) {
        return false;
    }

    if (
        candidate.stateId &&
        candidate.stateId !== draft.stateId
    ) {
        return false;
    }

    if (
        candidate.lgaId &&
        candidate.lgaId !== draft.lgaId
    ) {
        return false;
    }

    if (
        candidate.wardId &&
        candidate.wardId !== draft.wardId
    ) {
        return false;
    }

    if (
        candidate.senatorialDistrictId &&
        candidate.senatorialDistrictId !==
        draft.senatorialDistrictId
    ) {
        return false;
    }

    if (
        candidate.constituencyId &&
        candidate.constituencyId !==
        draft.constituencyId
    ) {
        return false;
    }

    if (
        candidate.areaCouncilId &&
        candidate.areaCouncilId !==
        draft.areaCouncilId
    ) {
        return false;
    }

    return true;
}

export default function Candidate() {
    const navigate = useNavigate();

    const [draft, setDraft] =
        useState<PickDraft | null>(null);

    const [selectedCandidateId, setSelectedCandidateId] =
        useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [invalidSelection, setInvalidSelection] =
        useState(false);

    useEffect(() => {
        const storedDraft =
            sessionStorage.getItem(PICK_DRAFT_KEY);

        if (!storedDraft) {
            navigate("/pick");
            return;
        }

        try {
            const parsedDraft =
                JSON.parse(storedDraft) as PickDraft;

            if (!parsedDraft.election) {
                navigate("/pick");
                return;
            }

            setDraft(parsedDraft);
            setSelectedCandidateId(
                parsedDraft.candidateId ?? null,
            );
        } catch {
            navigate("/pick");
        }
    }, [navigate]);

    const election = useMemo(() => {
        if (!draft?.election) {
            return undefined;
        }

        return electionTypes.find(
            (item) => item.id === draft.election,
        );
    }, [draft]);

    const matchingCandidates = useMemo(() => {
        if (!draft) {
            return [];
        }

        return presidentialCandidates.filter((candidate) =>
            candidateMatchesDraft(candidate, draft),
        );
    }, [draft]);

    const filteredCandidates = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return matchingCandidates;
        }

        return matchingCandidates.filter((candidate) => {
            const party = getParty(candidate.partyId);

            return [
                candidate.name,
                party?.name,
                party?.abbreviation,
            ]
                .filter(Boolean)
                .some((value) =>
                    value!.toLowerCase().includes(query),
                );
        });
    }, [matchingCandidates, searchQuery]);

    const locationParts = useMemo(() => {
        return draft ? getCandidateLocation(draft) : [];
    }, [draft]);

    function showInvalidSelection() {
        setInvalidSelection(true);
    }

    function handleCandidateAreaClick(
        event: React.MouseEvent<HTMLDivElement>,
    ) {
        const target = event.target as HTMLElement;

        if (
            target.closest("[data-fingerprint-selector]")
        ) {
            return;
        }

        showInvalidSelection();
    }

    function handleSelectCandidate(candidateId: string) {
        setSelectedCandidateId(candidateId);
        setInvalidSelection(false);
    }

    function handleContinue() {
        if (!draft || !selectedCandidateId) {
            return;
        }

        const updatedDraft: PickDraft = {
            ...draft,
            candidateId: selectedCandidateId,
        };

        sessionStorage.setItem(
            PICK_DRAFT_KEY,
            JSON.stringify(updatedDraft),
        );

        navigate("/pick/success");
    }

    if (!draft || !election) {
        return null;
    }

    return (
        <div className="mx-auto w-full flex-1 py-10">
            <div className="mx-auto w-full flex-1 py-5">
                <div className="mb-8">
                    <Badge variant="secondary" className="mb-4">
                        {election.name}
                    </Badge>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Who are you backing?
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Select the fingerprint area on
                        your preferred candidate.
                    </p>

                    {locationParts.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4" />

                            {locationParts.map(
                                (location, index) => (
                                    <span
                                        key={`${location}-${index}`}
                                    >
                                        {location}

                                        {index <
                                            locationParts.length -
                                            1 && (
                                                <span className="mx-1">
                                                    ·
                                                </span>
                                            )}
                                    </span>
                                ),
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-6 rounded-xl border border-border bg-muted/40 p-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="text-sm font-bold">
                                i
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                Use the designated
                                fingerprint area
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Press the fingerprint
                                button on the candidate
                                you want to select.
                                Clicking elsewhere on the
                                ballot does not count as a
                                valid selection.
                            </p>
                        </div>
                    </div>
                </div>

                <ValidationErrorDialog
                    open={invalidSelection}
                    onClose={() => setInvalidSelection(false)}
                    title="Invalid selection area"
                    message="On a physical ballot, make sure your thumbprint stays inside the designated fingerprint box. Look out for the correct selection area before marking your ballot."
                />

                {matchingCandidates.length > 0 && (
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(
                                        event.target.value,
                                    )
                                }
                                placeholder="Search candidate or party"
                                className="h-12 pl-10 pr-10 bg-card/60"
                                aria-label="Search candidates"
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSearchQuery("")
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label="Clear search"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {filteredCandidates.length}{" "}
                            {filteredCandidates.length === 1
                                ? "candidate"
                                : "candidates"}
                            {searchQuery &&
                                " matching your search"}
                        </p>
                    </div>
                )}

                {matchingCandidates.length > 0 ? (
                    filteredCandidates.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {filteredCandidates.map(
                                (candidate) => {
                                    const party = getParty(
                                        candidate.partyId,
                                    );

                                    const isSelected =
                                        selectedCandidateId ===
                                        candidate.id;

                                    return (
                                        <Card
                                            key={
                                                candidate.id
                                            }
                                            onClick={
                                                handleCandidateAreaClick
                                            }
                                            className={[
                                                "relative overflow-hidden transition-all",
                                                isSelected
                                                    ? "border-primary shadow-md"
                                                    : "hover:border-primary/40",
                                            ].join(" ")}
                                        >
                                            <CardContent className="p-0">
                                                <div className="flex min-h-48">
                                                    <div className="relative w-32 shrink-0 overflow-hidden bg-muted sm:w-36">
                                                        {candidate.image ? (
                                                            <img
                                                                src={
                                                                    candidate.image
                                                                }
                                                                alt={
                                                                    candidate.name
                                                                }
                                                                className="size-full object-cover object-top"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                                                                No image
                                                            </div>
                                                        )}

                                                        {isSelected && (
                                                            <div className="absolute inset-0 bg-primary/10" />
                                                        )}
                                                    </div>

                                                    <div className="flex min-w-0 flex-1 flex-col p-4">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <h2 className="font-bold tracking-tight">
                                                                    {
                                                                        candidate.name
                                                                    }
                                                                </h2>

                                                                {party && (
                                                                    <div className="mt-2 flex items-center gap-2">
                                                                        {party.logo && (
                                                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background p-1">
                                                                                <img
                                                                                    src={
                                                                                        party.logo
                                                                                    }
                                                                                    alt={
                                                                                        party.name
                                                                                    }
                                                                                    className="size-full object-contain"
                                                                                    loading="lazy"
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        <div className="min-w-0">
                                                                            <p className="text-xs font-bold">
                                                                                {
                                                                                    party.abbreviation
                                                                                }
                                                                            </p>

                                                                            <p className="truncate text-[11px] text-muted-foreground">
                                                                                {
                                                                                    party.name
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {candidate.isOfficial && (
                                                                <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                                                    Official
                                                                </span>
                                                            )}
                                                        </div>

                                                        {candidate.runningMateName && (
                                                            <p className="mt-3 text-xs text-muted-foreground">
                                                                Running mate:{" "}
                                                                <span className="font-medium text-foreground">
                                                                    {
                                                                        candidate.runningMateName
                                                                    }
                                                                </span>
                                                            </p>
                                                        )}

                                                        <div
                                                            data-fingerprint-selector
                                                            className="mt-auto flex items-end justify-between gap-3 pt-6"
                                                        >
                                                            <div>
                                                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                                                    Selection
                                                                </p>

                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    Use fingerprint
                                                                </p>
                                                            </div>

                                                            <FingerprintSelector
                                                                selected={
                                                                    isSelected
                                                                }
                                                                onSelect={() =>
                                                                    handleSelectCandidate(
                                                                        candidate.id,
                                                                    )
                                                                }
                                                                onInvalid={
                                                                    showInvalidSelection
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                },
                            )}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-6 text-center sm:p-8">
                                <h2 className="font-semibold">
                                    No candidates found
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Try searching with a
                                    different candidate
                                    name or party.
                                </p>

                                <Button
                                    variant="outline"
                                    className="mt-5"
                                    onClick={() =>
                                        setSearchQuery("")
                                    }
                                >
                                    Clear search
                                </Button>
                            </CardContent>
                        </Card>
                    )
                ) : (
                    <Card>
                        <CardContent className="p-6 sm:p-8">
                            <h2 className="text-lg font-semibold">
                                Candidate data isn't
                                available yet
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                We haven't added verified
                                candidate data for this
                                election and location yet.
                                We won't show made-up
                                candidates just to fill the
                                page.
                            </p>

                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() =>
                                    navigate(
                                        "/pick/location",
                                    )
                                }
                            >
                                Change selection
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="mx-auto flex w-full max-w-5xl justify-end">
                        <Button
                            size="lg"
                            className="w-full gap-2 sm:w-auto"
                            disabled={!selectedCandidateId}
                            onClick={handleContinue}
                        >
                            Continue
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}