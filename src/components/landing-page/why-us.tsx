import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "../ui/button";

const reasons = [
    {
        number: "01",
        title: "Your support, made visible.",
        description:
            "Political conversations already happen everywhere. Who.ng gives Nigerians a simple place to say who they're backing and why.",
    },
    {
        number: "02",
        title: "Your words matter.",
        description:
            "An endorsement isn't just a name. You can share the reasons behind your choice and let people understand what matters to you.",
    },
    {
        number: "03",
        title: "See the bigger picture.",
        description:
            "Explore aggregate endorsements from Who.ng users and see how support is being expressed across Nigeria.",
    },
];

interface WhyUsProps {
    onHaveYourSay: () => void;
}

export default function WhyUs({
    onHaveYourSay,
}: WhyUsProps) {
    return (
        <section
            id="why-who"
            className="overflow-hidden bg-background px-5 py-24 text-foreground sm:px-8 lg:py-32"
        >
            <div className="mx-auto max-w-360">
                {/* Header */}
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.8fr] lg:items-end">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-coral" />

                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Why Who.ng
                            </p>
                        </div>

                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            A space built around one simple idea: Nigerians should be able
                            to openly express who they support.
                        </p>
                    </div>

                    <h2 className="max-w-5xl text-5xl font-black leading-none tracking-tighter sm:text-6xl lg:text-8xl">
                        Politics is personal.
                        <br />
                        <span className="text-muted-foreground/40">
                            Your voice should be too.
                        </span>
                    </h2>
                </div>

                {/* Main visual */}
                <div className="relative mt-20 lg:mt-28">
                    <div className="grid border-y border-border lg:grid-cols-[1fr_1.5fr]">
                        {/* Statement */}
                        <div className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-16">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold tracking-widest text-muted-foreground">
                                    THE IDEA
                                </span>

                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                                    W
                                </span>
                            </div>

                            <p className="mt-16 max-w-lg text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                Who are you backing?
                                <br />
                                <span className="text-coral">And why?</span>
                            </p>

                            <div className="mt-10 flex items-center gap-3">
                                <span className="h-px w-10 bg-border" />

                                <p className="text-xs font-medium text-muted-foreground">
                                    That's what Who.ng is about.
                                </p>
                            </div>
                        </div>

                        {/* Reasons */}
                        <div className="divide-y divide-border">
                            {reasons.map((reason) => (
                                <article
                                    key={reason.number}
                                    className="group grid gap-6 py-10 sm:grid-cols-[60px_1fr] sm:py-12"
                                >
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground">
                                        {reason.number}
                                    </span>

                                    <div>
                                        <h3 className="max-w-xl text-2xl font-black tracking-tight sm:text-3xl">
                                            {reason.title}
                                        </h3>

                                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                            {reason.description}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/40 transition-colors group-hover:text-coral">
                                            <Check className="h-3.5 w-3.5" />
                                            Built for Nigerians
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Floating detail */}
                    <div className="absolute -bottom-6 right-5 hidden items-center gap-3 border border-border bg-card px-4 py-3 shadow-lg sm:flex">
                        <span className="h-2 w-2 rounded-full bg-lime" />

                        <p className="text-xs font-bold uppercase tracking-widest">
                            Your voice. Your choice.
                        </p>
                    </div>
                </div>

                {/* Bottom statement */}
                <div className="mt-20 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-28">
                    <div>
                        <p className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                            No official votes. No predictions. Just the voices of people who
                            choose to participate.
                        </p>

                        <p className="mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground">
                            Who.ng is independent and privately run. Endorsements on Who.ng
                            are not official votes and do not affect election results.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={onHaveYourSay}
                        className="group inline-flex w-fit items-center gap-4 rounded-full py-2 pl-5 pr-2 text-sm font-bold transition-transform hover:-translate-y-1"
                    >
                        Have your say

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-accent-foreground transition-transform group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
}