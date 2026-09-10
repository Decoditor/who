import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, Check, Share2 } from "lucide-react";

import { CelebrationConfetti } from "@/components/endorsement/confetti";
import { EndorsementCard } from "@/components/endorsement/card";
import Disclaimer from "@/components/disclaimer";
import { useEndorsement } from "@/contexts/endorsement";
import EndorsementHeader from "@/components/endorsement/header";
import { Button } from "@/components/ui/button";

export default function Success() {
    const { draft, clearDraft } = useEndorsement();

    const { candidate, reasons } = draft;

    if (!candidate || reasons.length !== 3) {
        return <Navigate to="/endorsement" replace />;
    }

    const handleShare = async () => {
        const shareText = `I'm backing ${candidate.name} (${candidate.party}) on who.ng.`;

        if (navigator.share) {
            await navigator.share({
                title: "My who.ng endorsement",
                text: shareText,
                url: window.location.origin,
            });

            return;
        }

        await navigator.clipboard.writeText(
            `${shareText}\n${window.location.origin}`,
        );
    };


    return (
        <main className="relative min-h-svh overflow-hidden bg-background">
            <CelebrationConfetti />
            <EndorsementHeader />
            <section className="relative z-10 mx-auto flex min-h-[calc(100svh-88px)] max-w-360 items-center px-6 pb-12 pt-8 sm:px-10 lg:px-14 lg:pb-20">
                <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
                    {/* Left side */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral">
                            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check size={15} strokeWidth={3} />
                            </span>

                            Endorsement recorded
                        </div>

                        <h1 className="mt-7 text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.88] tracking-[-0.06em]">
                            Your voice.
                            <br />
                            Your choice.
                            <br />
                            <span className="text-coral">On record.</span>
                        </h1>

                        <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                            You’ve publicly said who you’re backing and why. Your
                            endorsement is now part of the conversation on who.ng.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Button
                                type="button"
                                onClick={handleShare}
                                className=""
                            >
                                <Share2 size={17} />
                                Share endorsement
                            </Button>

                            <Link to="/dashboard" >
                                <Button variant={"outline"}>
                                    Dashboard
                                    <ArrowUpRight size={16} />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 max-w-md">
                            <Disclaimer />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="w-full max-w-xl justify-self-center lg:justify-self-end">
                        <EndorsementCard
                            candidate={candidate}
                            reasons={reasons}
                        />

                        <div className="mt-7 flex items-center justify-between text-xs text-muted-foreground">
                            <span>Shared from who.ng</span>
                            <span>Independent civic platform</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 bg-primary/40 blur-3xl" /> */}
        </main>
    );
}