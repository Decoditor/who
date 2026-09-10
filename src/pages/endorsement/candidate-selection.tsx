import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEndorsement } from "@/contexts/endorsement";
import { candidatesByPosition } from "@/constants";
import { isPosition, positions } from "@/constants";

export default function CandidateSelection() {
    const navigate = useNavigate();
    const { position: positionParam } = useParams();
    const { draft, setCandidate } = useEndorsement();

    const position = isPosition(positionParam)
        ? positionParam
        : null;

    const [selectedCandidate, setSelectedCandidate] = useState(
        draft.candidate?.id ?? "",
    );

    if (!position || draft.position !== position) {
        navigate("/endorsement", { replace: true });
        return null;
    }

    const candidates = candidatesByPosition[position];
    const positionDetails = positions[position];

    const handleContinue = () => {
        const candidate = candidates.find(
            (item) => item.id === selectedCandidate,
        );

        if (!candidate) return;

        setCandidate(candidate);

        navigate(
            `/endorsement/${position}/${candidate.id}/reasons`,
        );
    };

    return (
        <section className="space-y-8 max-w-2xl w-full">
            <div className="space-y-3">
                <p className="text-sm font-semibold text-coral">
                    Step 2 of 4
                </p>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    Who are you backing for {positionDetails.title}?
                </h1>

                <p className="text-muted-foreground">
                    Select one candidate to continue.
                </p>
            </div>

            <div className="grid gap-3">
                {candidates.map((candidate) => {
                    const selected = selectedCandidate === candidate.id;

                    return (
                        <button
                            key={candidate.id}
                            type="button"
                            onClick={() => setSelectedCandidate(candidate.id)}
                            className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors ${selected
                                ? "border-primary bg-muted"
                                : "border-border bg-card hover:border-primary"
                                }`}
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                {candidate.name.charAt(0)}
                            </span>

                            <span className="min-w-0 flex-1">
                                <span className="block font-bold">
                                    {candidate.name}
                                </span>

                                <span className="text-sm text-muted-foreground">
                                    {candidate.party}
                                </span>
                            </span>

                            {selected && (
                                <Check className="h-5 w-5 shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                disabled={!selectedCandidate}
                onClick={handleContinue}
                className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity disabled:opacity-50"
            >
                Continue
            </button>
        </section>
    );
}