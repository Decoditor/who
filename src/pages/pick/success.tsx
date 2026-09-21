import { useEffect, useMemo, useRef, useState } from "react";
import {
    Check,
    Copy,
    Download,
    FileBraces,
    Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import EndorsementCard from "@/components/pick/endorsement-card";

import { electionTypes } from "@/data/election";
import { parties } from "@/data/parties";

import {
    getFctAreaCouncils,
    getFederalConstituenciesByState,
    getLgaById,
    getSenatorialDistrictsByState,
    getStateById,
    getStateConstituenciesByState,
    getWardById,
} from "@/lib/locations";

import type { Candidate } from "@/types/candidate";
import type { EndorsementCardTemplate, PickDraft } from "@/types/pick";

import {
    copyShareLink,
    downloadEndorsementCard,
    shareEndorsementCard,
} from "@/lib/endorsement-card";
import { presidentialCandidates } from "@/data/candidates/presidential";

function getStoredDraft(): PickDraft | null {
    const storedDraft =
        sessionStorage.getItem("who-ng-pick-draft");

    if (!storedDraft) {
        return null;
    }

    try {
        return JSON.parse(storedDraft) as PickDraft;
    } catch {
        return null;
    }
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
            (item) =>
                item.id === draft.senatorialDistrictId,
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
                (item) =>
                    item.id === draft.constituencyId,
            );

        const stateConstituency =
            getStateConstituenciesByState(
                draft.stateId,
            ).find(
                (item) =>
                    item.id === draft.constituencyId,
            );

        const constituency =
            federalConstituency ?? stateConstituency;

        if (constituency) {
            parts.push(constituency.name);
        }
    }

    if (draft.areaCouncilId) {
        const areaCouncil = getFctAreaCouncils().find(
            (item) =>
                item.id === draft.areaCouncilId,
        );

        if (areaCouncil) {
            parts.push(areaCouncil.name);
        }
    }

    return parts;
}

function getCandidateById(
    candidateId: string,
): Candidate | undefined {
    return presidentialCandidates.find(
        (candidate) => candidate.id === candidateId,
    );
}

function getShareText(
    candidate: Candidate,
    draft: PickDraft,
) {
    const party = parties.find(
        (item) => item.id === candidate.partyId,
    );

    const election = electionTypes.find(
        (item) => item.id === draft.election,
    );

    const partyName =
        party?.abbreviation ??
        party?.name ??
        "an independent candidate";

    const reason = draft.reason?.trim();

    return [
        `I'm backing ${candidate.name} (${partyName}) for ${election?.name ?? "this election"} on Who.ng.`,
        reason ? `\nWhy: "${reason}"` : "",
        "\nWho are you backing?",
        "Endorse your own candidate on Who.ng:",
        window.location.origin,
    ]
        .filter(Boolean)
        .join("\n");
}


export default function Success() {
    const navigate = useNavigate();
    const [cardTemplate, setCardTemplate] =
        useState<EndorsementCardTemplate>("identity");
    const cardRef = useRef<HTMLDivElement>(null);
    const [draft, setDraft] = useState<PickDraft | null>(null);
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState<
        "idle" | "submitting" | "downloading" | "sharing"
    >("idle");
    const [isCopied, setIsCopied] = useState(false);

    const submitted = draft?.reason !== undefined;
    const isDownloading = status === "downloading";
    const isSharing = status === "sharing";

    useEffect(() => {
        const storedDraft = getStoredDraft();

        if (
            !storedDraft ||
            !storedDraft.election ||
            !storedDraft.candidateId
        ) {
            navigate("/pick");
            return;
        }

        setDraft(storedDraft);
        setReason(storedDraft.reason ?? "");

        if (storedDraft.reason !== undefined) {
            setStatus("idle");
        }
    }, [navigate]);

    const candidate = useMemo(() => {
        if (!draft?.candidateId) {
            return undefined;
        }

        return getCandidateById(
            draft.candidateId,
        );
    }, [draft]);

    const party = useMemo(() => {
        if (!candidate) {
            return undefined;
        }

        return parties.find(
            (item) =>
                item.id === candidate.partyId,
        );
    }, [candidate]);

    const election = useMemo(() => {
        if (!draft?.election) {
            return undefined;
        }

        return electionTypes.find(
            (item) => item.id === draft.election,
        );
    }, [draft]);

    const locationParts = useMemo(() => {
        if (!draft) {
            return [];
        }

        return getCandidateLocation(draft);
    }, [draft]);

    const shareText = useMemo(() => {
        if (!candidate || !draft) {
            return "";
        }

        return getShareText(
            candidate,
            draft,
        );
    }, [candidate, draft]);

    function handleSubmit() {
        if (!draft || !candidate) {
            return;
        }

        const updatedDraft: PickDraft = {
            ...draft,
            reason: reason.trim(),
        };

        sessionStorage.setItem(
            "who-ng-pick-draft",
            JSON.stringify(updatedDraft),
        );

        setDraft(updatedDraft);
        setStatus("idle");
    }

    function getSafeFileName() {
        if (!candidate) {
            return "who-ng-my-pick.png";
        }

        const safeName = candidate.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        return `who-ng-${safeName}.png`;
    }

    async function handleDownload() {
        if (!cardRef.current) return;

        try {
            setStatus("downloading");

            await downloadEndorsementCard(
                cardRef.current,
                getSafeFileName(),
            );
        } catch (error) {
            console.error(
                "Failed to download endorsement card:",
                error,
            );
        } finally {
            setStatus("idle");
        }
    }

    async function handleShare() {
        if (!cardRef.current) return;

        try {
            setStatus("sharing");

            const shared = await shareEndorsementCard(
                cardRef.current,
                shareText,
                getSafeFileName(),
            );

            if (!shared) {
                await handleDownload();
            }
        } catch (error) {
            console.error(
                "Failed to share endorsement card:",
                error,
            );
        } finally {
            setStatus("idle");
        }
    }

    function handleWhatsApp() {
        const text = encodeURIComponent(
            `${shareText}\n\nI made my pick on Who.ng.`,
        );

        window.open(
            `https://wa.me/?text=${text}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    function handleX() {
        const text = encodeURIComponent(
            `${shareText}\n\nI made my pick on Who.ng.`,
        );

        window.open(
            `https://twitter.com/intent/tweet?text=${text}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    function handleFacebook() {
        const url = encodeURIComponent(
            window.location.origin,
        );

        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    async function handleCopyLink() {
        try {
            await copyShareLink(
                window.location.origin,
            );

            setIsCopied(true);

            window.setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy link:",
                error,
            );
        }
    }

    if (!draft || !candidate || !election) {
        return null;
    }

    return (
        <div className="mx-auto w-full max-w-4xl flex-1 py-10 sm:py-14">
            {!submitted ? (
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-5" />
                        </div>

                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            One last thing
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                            Why are you backing{" "}
                            {candidate.name}?
                        </h1>

                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Give a short reason for your
                            choice. Your response can appear
                            on your shareable endorsement card.
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex items-center gap-4">
                                {candidate.image ? (
                                    <img
                                        src={candidate.image}
                                        alt=""
                                        className="size-16 rounded-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                        Candidate
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate font-bold">
                                        {candidate.name}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {party?.abbreviation ??
                                            party?.name}
                                        {" · "}
                                        {election.shortName}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-2">
                                <label
                                    htmlFor="reason"
                                    className="text-sm font-semibold"
                                >
                                    Your reason
                                </label>

                                <Textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(event) =>
                                        setReason(
                                            event.target.value.slice(
                                                0,
                                                280,
                                            ),
                                        )
                                    }
                                    placeholder="What makes you support this candidate?"
                                    rows={6}
                                    maxLength={280}
                                />

                                <div className="flex justify-end text-xs text-muted-foreground">
                                    {reason.length}/280
                                </div>
                            </div>

                            <Button
                                className="mt-6 w-full"
                                size="lg"
                                onClick={handleSubmit}
                            >
                                Create my endorsement card
                            </Button>
                        </CardContent>
                    </Card>

                    <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                        Who.ng is an independent civic
                        platform and is not affiliated with
                        INEC. An endorsement is not an official
                        vote and does not affect election
                        results.
                    </p>
                </div>
            ) : (
                <div>
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-6" />
                        </div>

                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Endorsement complete
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                            Your pick is in.
                        </h1>

                        <p className="mt-4 text-muted-foreground">
                            Your endorsement is ready to share.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-xl">
                        <div className="mb-4">
                            <p className="text-sm font-semibold">
                                Choose your card design
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Select a design for your endorsement card.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                aria-label="Select template 1"
                                aria-pressed={cardTemplate === "identity"}
                                onClick={() => setCardTemplate("identity")}
                                className={`w-24 overflow-hidden rounded-lg border-2 transition sm:w-28 ${cardTemplate === "identity"
                                    ? "border-primary"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <img
                                    src="/template1.png"
                                    alt="Template 1"
                                    className="aspect-4/5 w-full object-cover"
                                />
                            </button>

                            <button
                                type="button"
                                aria-label="Select template 2"
                                aria-pressed={cardTemplate === "editorial"}
                                onClick={() => setCardTemplate("editorial")}
                                className={`w-24 overflow-hidden rounded-lg border-2 transition sm:w-28 ${cardTemplate === "editorial"
                                    ? "border-primary"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <img
                                    src="/template2.png"
                                    alt="Template 2"
                                    className="aspect-4/5 w-full object-cover"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 w-fit">
                        <EndorsementCard
                            ref={cardRef}
                            candidate={candidate}
                            party={party}
                            election={election}
                            locationParts={locationParts}
                            userName={draft.name}
                            reason={draft.reason}
                            template={cardTemplate}
                        />
                    </div>

                    <div className="mx-auto mt-6 w-fit">
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            <Download />
                            {isDownloading
                                ? "Preparing card..."
                                : "Download card"}
                        </Button>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl">
                        <div className="mb-3 text-center">
                            <p className="text-sm font-semibold">
                                Share your pick
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Show people who you&apos;re
                                backing and why.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <Button
                                variant="outline"
                                onClick={handleWhatsApp}
                            >
                                WhatsApp
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleX}
                            >
                                X
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleFacebook}
                            >
                                <FileBraces />
                                Facebook
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleCopyLink}
                            >
                                {isCopied ? (
                                    <>
                                        <Check />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy />
                                        Copy link
                                    </>
                                )}
                            </Button>
                        </div>

                        <Button
                            variant="secondary"
                            className="mt-3 w-full"
                            onClick={handleShare}
                            disabled={isSharing}
                        >
                            <Share2 />
                            {isSharing
                                ? "Preparing share..."
                                : "Share card"}
                        </Button>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                navigate("/pick")
                            }
                        >
                            Make another pick
                        </Button>

                        <Button
                            variant="ghost"
                            className="flex-1"
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Back to Who.ng
                        </Button>
                    </div>

                    <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
                        Who.ng is an independent civic
                        platform and is not affiliated with
                        INEC. An endorsement is not an official
                        vote and does not affect election
                        results.
                    </p>
                </div>
            )}
        </div>
    );
}
