import { Landmark, Map, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEndorsement } from "@/contexts/endorsement";
import { positions } from "@/constants";
import type { Position } from "@/types";

const positionIcons = {
    president: Landmark,
    governor: Map,
    senate: Users,
};

export default function PositionSelection() {
    const navigate = useNavigate();
    const { setPosition } = useEndorsement();

    const handleSelect = (position: Position) => {
        setPosition(position);
        navigate(`/endorsement/${position}`);
    };

    return (
        <section className="space-y-8 max-w-2xl w-full">
            <div className="space-y-3">
                <p className="text-sm font-semibold text-coral">
                    Step 1 of 4
                </p>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    Who are you backing?
                </h1>

                <p className="max-w-xl text-muted-foreground">
                    Start by choosing the position you want to endorse.
                </p>
            </div>

            <div className="grid gap-4">
                {(Object.keys(positions) as Position[]).map((position) => {
                    const details = positions[position];
                    const Icon = positionIcons[position];

                    return (
                        <button
                            key={position}
                            type="button"
                            onClick={() => handleSelect(position)}
                            className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
                        >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                                <Icon className="h-5 w-5" />
                            </span>

                            <span className="min-w-0 flex-1">
                                <span className="block text-lg font-bold">
                                    {details.title}
                                </span>

                                <span className="mt-1 block text-sm text-muted-foreground">
                                    {details.description}
                                </span>

                                <span className="mt-2 block text-xs font-semibold text-muted-foreground">
                                    {details.location}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
                Your endorsement is not an official vote and does not affect
                election results.
            </p>
        </section>
    );
}