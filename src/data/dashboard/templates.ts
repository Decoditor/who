import type { ComponentType } from "react";

import type {
    EndorsementCardDesignProps,
    EndorsementCardTemplate,
} from "@/types/pick";
import { IdentityCard } from "@/components/endorsement/identity-card";
import { EditorialCard } from "@/components/endorsement/editorial-card";

export interface CardTemplate {
    id: EndorsementCardTemplate;
    name: string;
    description: string;
    component: ComponentType<EndorsementCardDesignProps>;
}

export const cardTemplates: CardTemplate[] = [
    {
        id: "identity",
        name: "Identity Card",
        description:
            "A bold candidate identity card focused on the candidate and their party.",
        component: IdentityCard,
    },
    {
        id: "editorial",
        name: "Editorial",
        description:
            "A more editorial-style endorsement card with the user's reason and election details.",
        component: EditorialCard,
    },
];