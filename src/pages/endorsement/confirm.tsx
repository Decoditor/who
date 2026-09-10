import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useEndorsement } from "@/contexts/endorsement";

export default function ConfirmEndorsement() {
    const navigate = useNavigate();
    const { draft } = useEndorsement();

    const { position, candidate, reasons } = draft;

    if (!position || !candidate || reasons.length !== 3) {
        navigate("/endorsement");
        return null;
    }

    const handleConfirm = () => {
        const endorsement = {
            position,
            candidateId: candidate.id,
            reasons,
        };

        console.log("Endorsement confirmed:", endorsement);

        navigate("/endorsement/success");
    };

    return (
        <>
            <div className="space-y-8">
                <section>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Your choice
                    </p>

                    <div className="mt-3 flex items-center gap-4 border border-border bg-muted p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-sm font-black text-primary-foreground">
                            {candidate.name.charAt(0)}
                        </div>

                        <div>
                            <p className="text-base font-bold">
                                {candidate.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {candidate.party}
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Your reasons
                    </p>

                    <div className="mt-3 divide-y divide-border border-y border-border">
                        {reasons.map((reason, index) => (
                            <div
                                key={`${index}-${reason}`}
                                className="flex gap-4 py-4"
                            >
                                <span className="text-xs font-bold text-muted-foreground">
                                    0{index + 1}
                                </span>

                                <p className="text-sm leading-relaxed">
                                    {reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex gap-3 border border-border bg-muted p-4">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <p className="text-xs leading-relaxed text-muted-foreground">
                        Your endorsement is not an official vote and does not affect
                        official election results. Who.ng is independent and privately
                        run.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            navigate(
                                `/endorsement/${position}/${candidate.id}/reasons`,
                            )
                        }
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Edit
                    </Button>

                    <Button type="button" onClick={handleConfirm}>
                        <Check className="h-4 w-4" />
                        Confirm endorsement
                    </Button>
                </div>
            </div>
        </>
    );
}