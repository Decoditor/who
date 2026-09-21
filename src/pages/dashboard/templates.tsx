import { MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { presidentialCandidates } from "@/data/candidates/presidential";
import { parties } from "@/data/parties";
import type { EndorsementCardDesignProps } from "@/types/pick";
import { electionTypes } from "@/data/election";
import { cardTemplates } from "@/data/dashboard/templates";

export default function DashboardTemplates() {
    const candidate =
        presidentialCandidates.find(
            (item) => item.image,
        ) ?? presidentialCandidates[0];

    const party = candidate
        ? parties.find(
            (item) => item.id === candidate.partyId,
        )
        : undefined;

    const election = electionTypes.find(
        (item) => item.id === "presidential",
    );

    if (!candidate || !election) {
        return null;
    }

    const previewProps: EndorsementCardDesignProps = {
        candidate,
        party,
        election,
        userName: "Your Name",
        locationParts: [],
        reason:
            "I believe this candidate represents the choice I want to support.",
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Card templates
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Templates
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Manage the templates available when users
                        create their endorsement cards.
                    </p>
                </div>

                <Button>
                    <Plus />
                    Add template
                </Button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {cardTemplates.map((template) => {
                    const TemplateCard = template.component;

                    return (
                        <div
                            key={template.id}
                            className="group relative"
                        >
                            <div className="absolute right-3 top-3 z-30">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button
                                                variant="secondary"
                                                size="icon-sm"
                                                className="rounded-full shadow-md"
                                                aria-label={`Manage ${template.name} template`}
                                            />
                                        }
                                    >
                                        <MoreHorizontal />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Edit template
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            Duplicate template
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            Set as default
                                        </DropdownMenuItem>

                                        <DropdownMenuItem variant="destructive">
                                            Delete template
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="overflow-hidden rounded-2xl bg-muted">
                                <TemplateCard
                                    {...previewProps}
                                />
                            </div>

                            <div className="mt-4">
                                <h2 className="font-semibold">
                                    {template.name}
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {template.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}