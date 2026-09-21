import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import type { ElectionType } from "@/types/election";
import { electionTypes } from "@/data/election";
import { getNextPickStep } from "@/lib/pick-flow";
import type { PickEntry } from "@/types/pick";

function getStoredEntry(): PickEntry | null {
    const stored = sessionStorage.getItem("who-ng-pick-entry");

    if (!stored) {
        return null;
    }

    try {
        return JSON.parse(stored) as PickEntry;
    } catch {
        return null;
    }
}

export default function Pick() {
    const navigate = useNavigate();

    const [entry, setEntry] = useState<PickEntry | null>(null);
    const [selectedElection, setSelectedElection] =
        useState<ElectionType | null>(null);

    useEffect(() => {
        const storedEntry = getStoredEntry();

        if (!storedEntry) {
            navigate("/", { replace: true });
            return;
        }

        setEntry(storedEntry);
    }, [navigate]);

    function handleContinue() {
        if (!selectedElection) {
            return;
        }

        const existingDraft =
            sessionStorage.getItem("who-ng-pick-draft");

        const draft = {
            ...(existingDraft
                ? JSON.parse(existingDraft)
                : {}),
            ...(entry ?? {}),
            election: selectedElection,
        };

        sessionStorage.setItem(
            "who-ng-pick-draft",
            JSON.stringify(draft),
        );

        const nextStep = getNextPickStep(selectedElection);

        console.log("Selected election:", selectedElection);
        console.log("Draft:", draft);
        console.log("Next step:", nextStep);

        navigate(nextStep);
    }

    if (!entry) {
        return null;
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">

                {/* Intro */}
                <section className="mx-auto mt-12 w-full max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
                        Step 01
                    </p>

                    <h1 className="mt-3 text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">
                        What are you
                        <br />
                        choosing today?
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Select the election you want to make a public pick for.
                        You'll choose your location and candidate next.
                    </p>
                </section>

                {/* Election options */}
                <section className="mx-auto mt-10 w-full max-w-3xl pb-32">
                    <RadioGroup
                        value={selectedElection ?? ""}
                        onValueChange={(value) =>
                            setSelectedElection(value as ElectionType)
                        }
                        className="grid gap-6 sm:grid-cols-2"
                    >
                        {electionTypes.map((election) => {
                            const isSelected =
                                selectedElection === election.id;

                            return (
                                <Label
                                    key={election.id}
                                    htmlFor={election.id}
                                    className="cursor-pointer"
                                >
                                    <Card
                                        className={`relative h-full transition-colors w-full ${isSelected
                                            ? "border-primary bg-coral/25"
                                            : "hover:border-primary/40"
                                            }`}
                                    >
                                        <CardContent className="flex items-start gap-4 p-5">
                                            <RadioGroupItem
                                                value={election.id}
                                                id={election.id}
                                                className="mt-1"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h2 className="font-bold tracking-tight">
                                                            {election.name}
                                                        </h2>

                                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                            {election.description}
                                                        </p>
                                                    </div>

                                                    {isSelected && (
                                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                            <Check className="h-3.5 w-3.5" />
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                                                    {election.shortName}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Label>
                            );
                        })}
                    </RadioGroup>
                </section>

                {/* Bottom action */}
                <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md">
                    <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="hidden sm:block">
                            <p className="text-xs font-medium text-muted-foreground">
                                Picking as
                            </p>

                            <p className="text-sm font-bold">
                                {entry.name}
                            </p>
                        </div>

                        <Button
                            type="button"
                            disabled={!selectedElection}
                            onClick={handleContinue}
                            className="ml-auto w-full gap-2 sm:w-auto"
                        >
                            Continue
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}