import type { EndorsementCardDesignProps } from "@/types/pick";
import type { Ref } from "react";


interface IdentityCardProps extends EndorsementCardDesignProps {
    previewRef?: Ref<HTMLDivElement>;
}

export function IdentityCard({
    candidate,
    party,
    election,
    userName,
    previewRef,
}: IdentityCardProps) {
    return (
        <div
            ref={previewRef}
            className="aspect-4/5 w-full max-w-lg overflow-hidden bg-primary text-primary-foreground shadow-2xl"
        >
            <div className="relative flex h-full flex-col p-6 sm:p-8">
                <div className="absolute right-0 top-0 flex size-40 items-center justify-center bg-coral sm:size-52">
                    {party?.logo ? (
                        <div className="flex size-26 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background p-2 shadow-lg sm:size-38">
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

                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em]">
                            who.ng
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/50">
                            Digital identity card
                        </p>
                    </div>
                </div>

                <div className="relative mt-8 flex flex-1 items-end">
                    <div className="absolute inset-x-0 top-0 h-3/4 overflow-hidden bg-primary-foreground/5">
                        <img
                            src={
                                candidate.image ??
                                "/candidates/default.jpg"
                            }
                            alt=""
                            className="h-full w-full object-cover object-top"
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "/candidates/default.jpg";
                            }}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
                            {party?.name}
                        </p>

                        <h2 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl">
                            {candidate.name}
                        </h2>

                        <p className="mt-2 font-serif text-xl italic text-coral">
                            For {election.name}
                        </p>
                    </div>
                </div>

                <div className="relative grid grid-cols-2 gap-4 border-t border-primary-foreground/20 pt-4">
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground/40">
                            Endorsed by
                        </p>

                        <p className="mt-1 text-sm font-bold uppercase">
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}