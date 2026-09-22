import type { EndorsementCardDesignProps } from "@/types/pick";
import type { Ref } from "react";


interface EditorialCardProps extends EndorsementCardDesignProps {
    previewRef?: Ref<HTMLDivElement>;
}

export function EditorialCard({
    candidate,
    party,
    election,
    locationParts,
    userName,
    reason,
    previewRef,
}: EditorialCardProps) {
    const locationLabel = locationParts.join(" · ");

    return (
        <div
            ref={previewRef}
            className="w-full max-w-2xl overflow-hidden bg-primary text-primary-foreground"
        >
            <div className="relative aspect-4/5 min-h-0 overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--cream) 1px, transparent 1px), linear-gradient(90deg, var(--cream) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-36 w-36 bg-coral sm:h-48 sm:w-48"
                />

                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 z-10 h-24 w-24 bg-coral sm:h-42 sm:w-52"
                />

                <div className="relative flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em]">
                                who.ng
                            </p>

                            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground/60">
                                Independent civic platform
                            </p>
                        </div>

                        {party?.logo ? (
                            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background p-2 shadow-lg sm:size-24">
                                <img
                                    src={party.logo}
                                    alt={party.name}
                                    className="size-full object-contain"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        ) : (
                            <div className="flex min-h-16 min-w-16 items-center justify-center border border-primary-foreground/30 px-3 py-2">
                                <span className="text-sm font-black">
                                    {party?.abbreviation ?? "IND"}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/50">
                            {party?.name ??
                                "Independent candidate"}
                        </p>

                        <p className="mt-1 text-sm font-black uppercase">
                            {party?.abbreviation ??
                                "Independent"}
                        </p>
                    </div>

                    <div className="z-20 mt-8 sm:mt-10">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                            I {userName} endorse
                        </p>

                        <h2 className="mt-2 max-w-lg text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl">
                            {candidate.name}
                        </h2>
                    </div>

                    <div className="absolute bottom-0 right-0">
                        <div className="relative mt-6 flex min-h-0 flex-1 items-end">
                            <div className="relative ml-auto h-full w-4/5 overflow-hidden sm:w-full">
                                <img
                                    src={
                                        candidate.image ??
                                        "/candidates/default.png"
                                    }
                                    alt={candidate.name}
                                    className="h-full w-full object-cover object-top"
                                    crossOrigin="anonymous"
                                    referrerPolicy="no-referrer"
                                    onError={(event) => {
                                        event.currentTarget.src =
                                            "/candidates/default.png";
                                    }}
                                />

                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent"
                                />
                            </div>

                            <div className="absolute bottom-4 left-0 z-12 max-w-[65%] sm:bottom-6">
                                <div className="inline-flex items-center gap-2 bg-primary-foreground px-3 py-2 text-xs font-bold uppercase text-primary">
                                    <span>
                                        {party?.abbreviation ??
                                            "Independent"}
                                    </span>

                                    {party?.name && (
                                        <>
                                            <span className="opacity-30">
                                                /
                                            </span>

                                            <span>
                                                {party.name}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-5">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground/50">
                                Election
                            </p>

                            <p className="mt-1 text-sm font-bold uppercase">
                                {election.shortName}
                            </p>

                            {locationLabel && (
                                <p className="mt-1 text-xs text-primary-foreground/60">
                                    {locationLabel}
                                </p>
                            )}
                        </div>
                    </div>

                    {reason && (
                        <div className="relative mt-5 border-l-2 border-coral pl-4 sm:mt-6">
                            <p className="text-xs leading-relaxed text-primary-foreground/80 sm:text-sm">
                                &ldquo;{reason}&rdquo;
                            </p>
                        </div>
                    )}

                    <div className="relative mt-5 hidden items-end justify-between border-t border-primary-foreground/20 pt-4 sm:mt-6 sm:flex">
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary-foreground/50">
                            A personal endorsement
                        </p>

                        <p className="text-xs font-bold uppercase tracking-[0.08em]">
                            who.ng ↗
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}