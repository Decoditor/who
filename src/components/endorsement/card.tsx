import type { Candidate } from "@/types";

interface EndorsementCardProps {
    candidate: Candidate;
    reasons: string[];
}

export function EndorsementCard({
    candidate,
    reasons,
}: EndorsementCardProps) {
    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-coral/40" />

            <div className="relative border border-primary bg-card p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            My endorsement
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            {candidate.name}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-coral">
                            {candidate.party}
                        </p>
                    </div>

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-lg font-bold">✓</span>
                    </div>
                </div>

                <div className="my-7 h-px bg-border" />

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Why I’m backing them
                    </p>

                    <div className="mt-4 space-y-4">
                        {reasons.map((reason, index) => (
                            <div key={index} className="flex gap-3">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />
                                <p className="text-sm leading-6 text-foreground/80">
                                    {reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
                    <span className="text-lg font-bold tracking-tight">who.ng</span>

                    <span className="max-w-44 text-right text-[10px] leading-4 text-muted-foreground">
                        Personal endorsement. Not an official vote or election result.
                    </span>
                </div>
            </div>
        </div>
    );
}