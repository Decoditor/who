import type { Ref } from "react";

interface DangoteShareholderCardProps {
    previewRef?: Ref<HTMLDivElement>;
    photo?: string;
    name?: string;
    role?: string;
    shares?: string | number;
    isRefinery?: boolean;
}

export function DangoteShareholderCard({
    previewRef,
    photo,
    name,
    role,
    shares,
    isRefinery,
}: DangoteShareholderCardProps) {
    const displayName = name?.trim() || "YOUR NAME";
    const displayShares = shares
        ? `${shares} SHARES`
        : "YOUR SHARES";

    function Ribbon() {
        return (
            <div className="absolute inset-x-7 top-[69%] h-[11%]">
                <div
                    aria-hidden="true"
                    className="absolute inset-y-1 left-[-6%] w-[12%] bg-[#d49b00]"
                    style={{
                        clipPath:
                            "polygon(0 50%, 30% 0, 100% 0, 75% 50%, 100% 100%, 30% 100%)",
                    }}
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-y-1 right-[-6%] w-[12%] bg-[#d49b00]"
                    style={{
                        clipPath:
                            "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 25% 50%)",
                    }}
                />

                <div className="absolute inset-0 border-8 border-[#e6b51e] bg-[#173d83] px-5 py-2 shadow-sm">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-center text-[clamp(1.4rem,4.8cqw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
                            {role?.trim() || "PARTNER"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={previewRef}
            className="dangote-card"
            role="img"
            aria-label="Dangote membership card preview"
        >
            <img
                src="/memes/dangote/refinery.jpeg"
                alt=""
                className="dangote-card__refinery"
            />

            <div className="dangote-card__overlay" />

            <div className="absolute right-4 top-4 z-40 flex flex-col items-end text-white">
                <img
                    src="/memes/dangote/logo.png"
                    alt="Dangote Refinery"
                    className="h-auto w-[34%] object-contain"
                />

                <p className="text-2xl font-semibold uppercase">
                    {isRefinery ? "Refinery" : "Others"}
                </p>
            </div>

            <div className="dangote-card__portrait">
                <div className="dangote-card__portrait-ring">
                    {photo ? (
                        <img
                            src={photo}
                            alt=""
                            className="dangote-card__portrait-image"
                        />
                    ) : (
                        <div className="dangote-card__portrait-placeholder">
                            YOUR
                            <br />
                            PHOTO
                        </div>
                    )}
                </div>
            </div>

            <Ribbon />

            <p className="dangote-card__slogan">
                INVESTING IN A
                <br />
                STRONGER NIGERIA
            </p>

            <p className="dangote-card__meta">
                <span className="dangote-card__meta-name">
                    {displayName}
                </span>

                <span
                    className="dangote-card__meta-dot"
                    aria-hidden="true"
                >
                    &middot;
                </span>

                <span className="dangote-card__meta-shares">
                    {displayShares}
                </span>
            </p>

            <p className="dangote-card__footer">
                who.ng/dangote
                <span
                    className="dangote-card__footer-dot"
                    aria-hidden="true"
                >
                    &middot;
                </span>
                fan-made card, not an official Dangote asset
            </p>
        </div>
    );
}