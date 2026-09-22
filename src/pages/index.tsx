import { useState } from "react";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import Disclaimer from "@/components/disclaimer";
import HowItWorks from "@/components/landing-page/how-it-works";
import WhyUs from "@/components/landing-page/why-us";
import Footer from "@/components/footer";
import PickEntryDialog from "@/components/pick/entry-dialog";


const positions = [
    {
        number: "01",
        label: "President",
        className: "left-[4%] top-[22%] rotate-[-4deg]",
    },
    {
        number: "02",
        label: "Governor",
        className: "right-[5%] top-[33%] rotate-[4deg]",
    },
    {
        number: "03",
        label: "Senate",
        className: "left-[9%] bottom-[24%] rotate-[3deg]",
    },
];

const featuredCandidates = [
    {
        name: "Bola Ahmed Tinubu",
        image:
            "/candidates/tinubu.png",
    },
    {
        name: "Atiku Abubakar",
        image:
            "/candidates/atiku.png",
    },
    {
        name: "Peter Obi",
        image:
            "/candidates/obi.png",
    },
];

function CandidatePortraits({ mobile = false }: { mobile?: boolean }) {
    if (mobile) {
        return (
            <div className="mx-auto w-full max-w-sm">
                <div className="grid grid-cols-3 items-end gap-2">
                    {/* Atiku */}
                    <div className="h-56 overflow-hidden rounded-t-[5rem] border-2 shadow-lg">
                        <img
                            src={featuredCandidates[1].image}
                            alt={featuredCandidates[1].name}
                            className="h-full w-full object-cover border object-top"
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    {/* Tinubu */}
                    <div className="h-72 border-2 border-primary overflow-hidden rounded-t-[6rem] bg-muted shadow-xl">
                        <img
                            src={featuredCandidates[0].image}
                            alt={featuredCandidates[0].name}
                            className="h-full w-full object-cover object-top"
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                    {/* Peter Obi */}
                    <div className="h-56 overflow-hidden rounded-t-[5rem] bg-muted shadow-lg">
                        <img
                            src={featuredCandidates[2].image}
                            alt={featuredCandidates[2].name}
                            className="h-full w-full object-cover object-top"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </div>

                <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-coral" />
                    Presidential candidates
                </div>
            </div>
        );
    }

    return (
        <div className="relative mx-auto w-full max-w-3xl">
            <div className="grid grid-cols-3 items-end gap-3">
                {/* Atiku */}
                <div className="h-96 border border-primary overflow-hidden rounded-t-[8rem] bg-muted shadow-xl transition-transform duration-300 hover:-translate-y-2">
                    <img
                        src={featuredCandidates[1].image}
                        alt={featuredCandidates[1].name}
                        className="h-full w-full object-cover object-top"
                        loading="eager"
                        decoding="async"
                    />
                </div>

                {/* Tinubu */}
                <div className="h-120 border overflow-hidden rounded-t-[10rem] border-primary shadow-2xl transition-transform duration-300 hover:-translate-y-2">
                    <img
                        src={featuredCandidates[0].image}
                        alt={featuredCandidates[0].name}
                        className="h-full w-full object-cover object-top"
                        loading="eager"
                        decoding="async"
                    />
                </div>

                {/* Peter Obi */}
                <div className="h-96 overflow-hidden border border-primary rounded-t-[8rem] bg-muted shadow-xl transition-transform duration-300 hover:-translate-y-2">
                    <img
                        src={featuredCandidates[2].image}
                        alt={featuredCandidates[2].name}
                        className="h-full w-full object-cover object-top"
                        loading="eager"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold shadow-md">
                <span className="h-2 w-2 rounded-full bg-coral" />
                Presidential candidates
            </div>
        </div>
    );
}

function HeroCopy({
    mobile = false,
    onHaveYourSay,
}: {
    mobile?: boolean;
    onHaveYourSay: () => void;
}) {
    if (mobile) {
        return (
            <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="h-px w-6 bg-border" />
                    A Nigerian civic platform
                    <span className="h-px w-6 bg-border" />
                </div>

                <h1 className="font-heading text-4xl font-black leading-[0.82] tracking-tighter sm:text-7xl">
                    WHO
                    <span className="block text-coral">ARE YOU</span>
                    <span className="block">BACKING?</span>
                </h1>

                <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
                    Say who you're backing, explain why, and share your choice.
                </p>

                <button
                    type="button"
                    onClick={onHaveYourSay}
                    className="group mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                    Make your choice
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="relative z-30 flex h-full flex-col justify-center">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="h-px w-8 bg-border" />
                A Nigerian civic platform
            </div>

            <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black leading-[0.78] tracking-tighter">
                WHO
                <span className="block text-coral">ARE YOU</span>
            </h1>

            <div className="mt-8 flex items-center gap-4">
                <button
                    type="button"
                    onClick={onHaveYourSay}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                    Make your choice
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground text-primary">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </button>

                <span className="text-xs font-medium text-muted-foreground">
                    Say it. Share it.
                </span>
            </div>
        </div>
    );
}

function PositionLabels() {
    return (
        <>
            {positions.map((position) => (
                <div
                    key={position.number}
                    className={`absolute z - 40 hidden items - center gap - 2 rounded - full border border - border bg - background px - 3 py - 2 text - xs font - semibold shadow - sm lg:flex ${position.className}`}
                >
                    <span className="text-muted-foreground">
                        {position.number}
                    </span>

                    <span>{position.label}</span>

                    <ChevronRight className="h-3.5 w-3.5 text-coral" />
                </div>
            ))}
        </>
    );
}

export default function Onboarding() {
    const [pickDialogOpen, setPickDialogOpen] = useState(false);

    const openPickDialog = () => {
        setPickDialogOpen(true);
    };

    return (
        <main className="min-h-screen relative overflow-hidden bg-background text-foreground">
            <Header onHaveYourSay={openPickDialog} />

            <section
                className="relative border-b border-border"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, color-mix(in oklch, var(--green) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--green) 7%, transparent) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            >
                <PositionLabels />

                {/* Desktop hero */}
                <div className="relative mx-auto hidden min-h-[calc(100svh-5rem)] max-w-400 px-6 py-12 lg:block">
                    <div className="grid min-h-[calc(100svh-11rem)] grid-cols-[0.85fr_1.4fr_0.75fr] items-center gap-8 md:gap-0">
                        {/* Left copy */}
                        <HeroCopy onHaveYourSay={openPickDialog} />

                        {/* Main candidate composition */}
                        <div className="relative flex items-end justify-center">
                            <CandidatePortraits />

                            <div className="absolute -top-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Your choice. Your voice.
                            </div>
                        </div>

                        {/* Right copy */}
                        <div className="relative z-30 flex flex-col items-end justify-center text-right">
                            <div className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Public endorsement
                            </div>

                            <h2 className="font-heading text-[clamp(4rem,7vw,7rem)] font-black leading-[0.78] tracking-tighter">
                                BACKING?
                            </h2>

                            <div className="mt-8 max-w-48 space-y-3">
                                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                                    <Check className="h-4 w-4 text-coral" />
                                    Choose a candidate
                                </div>

                                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                                    <Check className="h-4 w-4 text-coral" />
                                    Give your reason
                                </div>

                                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                                    <Check className="h-4 w-4 text-coral" />
                                    Share your choice
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
                        <span>
                            Independent. Public. Not an official voting platform.
                        </span>

                        <span className="font-medium">
                            who.ng
                        </span>
                    </div>
                </div>

                {/* Mobile hero */}
                <div className="relative px-5 pb-10 pt-10 lg:hidden">
                    <HeroCopy mobile onHaveYourSay={openPickDialog} />

                    <div className="mt-10">
                        <CandidatePortraits mobile />
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-5 text-center">
                        {positions.map((position) => (
                            <div key={position.number}>
                                <span className="block text-[10px] font-semibold text-muted-foreground">
                                    {position.number}
                                </span>

                                <span className="mt-1 block text-xs font-semibold">
                                    {position.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                        Independent. Public. Not an official voting platform.
                    </div>
                </div>
            </section>

            <Disclaimer />

            <HowItWorks onHaveYourSay={openPickDialog} />

            <WhyUs onHaveYourSay={openPickDialog} />

            <Footer onHaveYourSay={openPickDialog} />

            <PickEntryDialog
                open={pickDialogOpen}
                onOpenChange={setPickDialogOpen}
            />
        </main>
    );
}