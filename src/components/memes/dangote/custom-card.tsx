import type { Ref } from "react";

interface DangoteCustomCardProps {
    previewRef?: Ref<HTMLDivElement>;
    photo?: string;
    name?: string;
    headline?: string;
    detail?: string;
}

export function DangoteCustomCard({
    previewRef,
    photo,
    name,
    headline,
    detail,
}: DangoteCustomCardProps) {
    const displayName = name?.trim() || "YOUR NAME";
    const displayHeadline = headline?.trim() || "YOUR HEADLINE";
    const displayDetail = detail?.trim() || "YOUR DETAIL";

    return (
        <div
            ref={previewRef}
            className="relative aspect-4/5 w-full overflow-hidden bg-primary text-primary-foreground"
        >
            <img
                src="/memes/dangote/refinery.jpeg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-right"
            />

            <div className="absolute inset-0 bg-primary/75" />

            <div className="relative flex h-full flex-col p-6">
                <div className="flex justify-end">
                    <img
                        src="/memes/dangote/logo.png"
                        alt="Dangote"
                        className="w-24 object-contain"
                    />
                </div>

                <div className="mt-auto">
                    {photo && (
                        <div className="mb-5 size-24 overflow-hidden rounded-full border-4 border-primary-foreground">
                            <img
                                src={photo}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <p className="text-3xl font-black uppercase tracking-tight">
                        {displayHeadline}
                    </p>

                    <p className="mt-2 text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
                        {displayDetail}
                    </p>

                    <div className="mt-6 border-t border-primary-foreground/20 pt-4">
                        <p className="text-lg font-bold uppercase">
                            {displayName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}