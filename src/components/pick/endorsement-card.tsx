import type { EndorsementCardProps } from "@/types/pick";
import { forwardRef } from "react";
import { IdentityCard } from "../endorsement/identity-card";
import { EditorialCard } from "../endorsement/editorial-card";




const EndorsementCard = forwardRef<
    HTMLDivElement,
    EndorsementCardProps
>(function EndorsementCard(
    {
        candidate,
        party,
        election,
        locationParts = [],
        userName,
        reason,
        template = "identity",
    },
    ref,
) {
    const props = {
        candidate,
        party,
        election,
        locationParts,
        userName,
        reason,
    };

    if (template === "editorial") {
        return (
            <EditorialCard
                {...props}
                previewRef={ref}
            />
        );
    }

    return (
        <IdentityCard
            {...props}
            previewRef={ref}
        />
    );
});

export default EndorsementCard;