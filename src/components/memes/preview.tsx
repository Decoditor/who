import type { MemeTemplate } from "@/types/memes";
import { DangoteCustomCard } from "./dangote/custom-card";
import { DangoteShareholderCard } from "./dangote/shareholder-card";

interface MemeCardPreviewProps {
    template: MemeTemplate;
    values: Record<string, string | number | boolean>;
    previewRef?: React.RefObject<HTMLDivElement | null>;
}

export function MemeCardPreview({
    template,
    values,
    previewRef,
}: MemeCardPreviewProps) {
    const name = String(values.name || "");
    const photo = String(values.photo || "");
    const role = String(values.role || "");
    const shares = values.shares;
    const company = String(
        values.company || "Dangote Refinery",
    );

    const isRefinery =
        company === "Dangote Refinery" ||
        company === "Dangote Group";

    switch (template.id) {
        case "dangote-shareholder":
            return (
                <DangoteShareholderCard
                    previewRef={previewRef}
                    photo={photo}
                    name={name}
                    role={role}
                    isRefinery={isRefinery}
                    shares={shares as string | number | undefined}
                />
            );

        case "dangote-partner":
            return (
                <DangoteShareholderCard
                    previewRef={previewRef}
                    photo={photo}
                    name={name}
                    role={role}
                    isRefinery={isRefinery}
                />
            );

        case "dangote-custom":
            return (
                <DangoteCustomCard
                    previewRef={previewRef}
                    photo={photo}
                    name={name}
                    headline={String(values.headline || "")}
                    detail={String(values.detail || "")}
                />
            );

        default:
            return null;
    }
}