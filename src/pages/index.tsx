import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "@/components/header";
import Disclaimer from "@/components/disclaimer";
import HowItWorks from "@/components/landing-page/how-it-works";
import WhyUs from "@/components/landing-page/why-us";
import Footer from "@/components/footer";

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

export default function Onboarding() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F4F0E8] text-[#123B35]">
            <Header />

            {/* Background grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.055]"
                style={{
                    backgroundImage:
                        "linear-gradient(#123B35 1px, transparent 1px), linear-gradient(90deg, #123B35 1px, transparent 1px)",
                    backgroundSize: "70px 70px",
                }}
            />

            <section className="relative px-4 pb-8 pt-28 sm:px-6 lg:min-h-screen lg:px-8">
                <div className="mx-auto max-w-360">
                    {/* Top labels */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#123B35]/50">
                            <span className="h-2 w-2 rounded-full bg-[#E5FF55]" />
                            A Nigerian civic platform
                        </div>

                        <div className="hidden text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#123B35]/40 sm:block">
                            Say it.
                            <br />
                            Share it.
                        </div>
                    </div>

                    {/* =========================
              DESKTOP COMPOSITION
          ========================== */}
                    <div className="relative mt-8 hidden min-h-[calc(100vh-12rem)] items-center lg:flex">
                        {/* Background typography */}
                        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
                            <div className="text-[clamp(8rem,14vw,13rem)] font-black leading-[0.72] tracking-[-0.09em] text-[#123B35]/[0.075]">
                                WHO
                            </div>

                            <div className="text-[clamp(8rem,14vw,13rem)] font-black leading-[0.72] tracking-[-0.09em] text-[#123B35]/[0.075]">
                                NG
                            </div>
                        </div>

                        {/* Floating position labels */}
                        {positions.map((position) => (
                            <div
                                key={position.number}
                                className={`absolute z-20 flex items-center gap-3 rounded-full border border-[#123B35]/10 bg-[#F4F0E8]/85 px-3 py-2 backdrop-blur-md ${position.className}`}
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123B35] text-[9px] font-bold text-white">
                                    {position.number}
                                </span>

                                <span className="pr-1 text-[10px] font-bold uppercase tracking-[0.15em]">
                                    {position.label}
                                </span>
                            </div>
                        ))}

                        {/* Left headline */}
                        <div className="absolute left-0 top-[8%] z-10 w-[31%]">
                            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#123B35]/45">
                                The choice is yours
                            </p>

                            <h1 className="text-[clamp(4rem,5.7vw,6.5rem)] font-black leading-[0.82] tracking-[-0.075em]">
                                WHO
                                <br />
                                ARE YOU
                            </h1>
                        </div>

                        {/* Right headline */}
                        <div className="absolute right-0 top-[17%] z-10 w-[31%] text-right">
                            <h1 className="text-[clamp(4rem,5.7vw,6.5rem)] font-black leading-[0.82] tracking-[-0.075em]">
                                BACKING
                                <span className="text-[#D96D45]">?</span>
                            </h1>

                            <p className="ml-auto mt-7 max-w-[280px] text-sm leading-6 text-[#123B35]/60">
                                Tell Nigeria who you support and why. Your endorsement,
                                your words, your choice.
                            </p>
                        </div>

                        {/* Central visual */}
                        <div className="relative z-10 mx-auto w-[44%] max-w-[580px]">
                            <div className="relative aspect-[0.9] overflow-hidden bg-[#123B35] shadow-[0_35px_80px_rgba(18,59,53,0.18)]">
                                {/* Top label */}
                                <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-7 py-5">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                                        WHO.NG / 01
                                    </span>

                                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
                                        Make it count
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#E5FF55]" />
                                    </span>
                                </div>

                                {/* Main card */}
                                <div className="absolute left-[9%] right-[9%] top-[17%] h-[62%] bg-[#E8E3D8] p-7 shadow-2xl">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#123B35]/45">
                                                My endorsement
                                            </p>

                                            <p className="mt-2 text-[10px] text-[#123B35]/45">
                                                Who I&apos;m backing
                                            </p>
                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123B35] text-xs font-black text-white">
                                            W
                                        </div>
                                    </div>

                                    <div className="mt-12 flex items-center gap-5">
                                        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D96D45]">
                                            <div className="absolute -bottom-7 h-20 w-20 rounded-full bg-[#123B35]" />
                                            <div className="absolute top-5 h-12 w-12 rounded-full bg-[#F4F0E8]" />
                                        </div>

                                        <div>
                                            <div className="h-3 w-36 rounded-full bg-[#123B35]" />
                                            <div className="mt-3 h-2 w-20 rounded-full bg-[#123B35]/20" />

                                            <div className="mt-5 inline-flex items-center gap-2 bg-[#E5FF55] px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.15em]">
                                                <Check className="h-3 w-3" />
                                                Backing
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-7 left-7 right-7 border-t border-[#123B35]/10 pt-5">
                                        <p className="max-w-[330px] text-xl font-bold leading-tight tracking-[-0.035em]">
                                            &ldquo;I&apos;m backing this candidate because their
                                            ideas speak to the future I want.&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Accent */}
                                <div className="absolute bottom-[11%] left-[9%] flex -rotate-3 items-center gap-2 bg-[#E5FF55] px-4 py-2.5 shadow-lg">
                                    <span className="h-2 w-2 rounded-full bg-[#123B35]" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                                        Your voice matters
                                    </span>
                                </div>

                                <div className="absolute bottom-[9%] right-[9%] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E5FF55]" />
                            </div>

                            {/* Floating detail */}
                            <div className="absolute -right-5 bottom-10 translate-x-full rounded-[18px] border border-[#123B35]/10 bg-white px-4 py-4 shadow-xl">
                                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#123B35]/40">
                                    Your words
                                </p>

                                <p className="mt-1 text-sm font-bold tracking-[-0.02em]">
                                    Your reason.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="absolute bottom-[8%] left-0 z-20 max-w-[280px]">
                            <p className="mb-4 text-xs leading-5 text-[#123B35]/55">
                                Choose your position, make your endorsement, and share your
                                reason with others.
                            </p>

                            <Link
                                to="/signup"
                                className="group inline-flex items-center gap-4 rounded-full bg-[#123B35] py-2 pl-5 pr-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                Make your choice

                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5FF55] text-[#123B35] transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </Link>
                        </div>

                        {/* Position list */}
                        <div className="absolute bottom-[8%] right-0 max-w-[190px] text-right">
                            <div className="mb-3 ml-auto h-px w-12 bg-[#123B35]/20" />

                            <p className="text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-[#123B35]/45">
                                President
                                <br />
                                Governor
                                <br />
                                Senate
                            </p>
                        </div>
                    </div>

                    {/* =========================
              MOBILE COMPOSITION
          ========================== */}
                    <div className="mt-10 lg:hidden">
                        {/* Headline */}
                        <div className="relative z-10">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#123B35]/45">
                                The choice is yours
                            </p>

                            <h1 className="max-w-[700px] text-[clamp(4rem,18vw,7rem)] font-black leading-[0.76] tracking-[-0.085em]">
                                WHO
                                <br />
                                ARE YOU
                                <br />
                                <span className="text-[#D96D45]">BACKING?</span>
                            </h1>

                            <p className="mt-7 max-w-[360px] text-sm leading-6 text-[#123B35]/60">
                                Tell Nigeria who you support and why. Your endorsement, your
                                words, your choice.
                            </p>
                        </div>

                        {/* Mobile position indicators */}
                        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                            {positions.map((position) => (
                                <div
                                    key={position.number}
                                    className="flex shrink-0 items-center gap-2 rounded-full border border-[#123B35]/10 bg-white/60 px-2 py-1.5"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123B35] text-[8px] font-bold text-white">
                                        {position.number}
                                    </span>

                                    <span className="pr-2 text-[9px] font-bold uppercase tracking-[0.13em]">
                                        {position.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Central visual */}
                        <div className="relative mt-8">
                            <div className="relative overflow-hidden bg-[#123B35] shadow-[0_25px_60px_rgba(18,59,53,0.16)]">
                                {/* Header inside card */}
                                <div className="flex items-center justify-between px-5 py-5">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                                        WHO.NG / 01
                                    </span>

                                    <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/55">
                                        Make it count
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#E5FF55]" />
                                    </span>
                                </div>

                                {/* Inner endorsement */}
                                <div className="mx-4 mb-12 bg-[#E8E3D8] p-5 sm:mx-7 sm:p-7">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#123B35]/45">
                                                My endorsement
                                            </p>

                                            <p className="mt-2 text-[10px] text-[#123B35]/45">
                                                Who I&apos;m backing
                                            </p>
                                        </div>

                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123B35] text-[10px] font-black text-white">
                                            W
                                        </div>
                                    </div>

                                    <div className="mt-9 flex items-center gap-4 sm:mt-12">
                                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D96D45] sm:h-24 sm:w-24">
                                            <div className="absolute -bottom-6 h-16 w-16 rounded-full bg-[#123B35]" />
                                            <div className="absolute top-4 h-9 w-9 rounded-full bg-[#F4F0E8]" />
                                        </div>

                                        <div>
                                            <div className="h-2.5 w-24 rounded-full bg-[#123B35] sm:w-32" />
                                            <div className="mt-3 h-2 w-16 rounded-full bg-[#123B35]/20" />

                                            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#E5FF55] px-2 py-1 text-[7px] font-black uppercase tracking-[0.15em]">
                                                <Check className="h-2.5 w-2.5" />
                                                Backing
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 border-t border-[#123B35]/10 pt-5 sm:mt-10">
                                        <p className="max-w-[420px] text-lg font-bold leading-tight tracking-[-0.035em] sm:text-xl">
                                            &ldquo;I&apos;m backing this candidate because their
                                            ideas speak to the future I want.&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Accent label */}
                                <div className="absolute bottom-5 left-5 flex -rotate-2 items-center gap-2 bg-[#E5FF55] px-3 py-2 shadow-lg">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#123B35]" />

                                    <span className="text-[7px] font-black uppercase tracking-[0.16em]">
                                        Your voice matters
                                    </span>
                                </div>

                                <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white">
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E5FF55]" />
                            </div>

                            {/* Mobile floating note */}
                            <div className="absolute -bottom-5 right-4 rounded-[16px] border border-[#123B35]/10 bg-white px-4 py-3 shadow-xl sm:right-8">
                                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#123B35]/40">
                                    Your words
                                </p>

                                <p className="mt-1 text-xs font-bold">
                                    Your reason.
                                </p>
                            </div>
                        </div>

                        {/* Mobile CTA */}
                        <div className="mt-14">
                            <p className="mb-4 max-w-[340px] text-xs leading-5 text-[#123B35]/55">
                                Choose your position, make your endorsement, and share your
                                reason with others.
                            </p>

                            <Link
                                to="/signup"
                                className="group inline-flex w-full items-center justify-between rounded-full bg-[#123B35] py-2 pl-5 pr-2 text-sm font-bold text-white shadow-lg sm:w-auto"
                            >
                                Make your choice

                                <span className="ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5FF55] text-[#123B35]">
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-20 mt-14 flex flex-col gap-5 border-t border-[#123B35]/10 pt-5 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
                        <Disclaimer />

                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#123B35]/40">
                            <span>Independent</span>

                            <span className="h-1 w-1 rounded-full bg-[#D96D45]" />

                            <span>Non-partisan</span>

                            <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                    </div>
                </div>
            </section>

            <HowItWorks />
            <WhyUs />
            <Footer />
        </main>
    );
}