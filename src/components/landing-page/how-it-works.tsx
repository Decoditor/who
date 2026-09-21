import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

interface HowItWorksProps {
    onHaveYourSay: () => void;
}

export default function HowItWorks({
    onHaveYourSay,
}: HowItWorksProps) {
    return (
        <section
            id="how-it-works"
            className="bg-primary px-5 py-24 text-primary-foreground sm:px-8 lg:py-32"
        >
            <div className="mx-auto max-w-360">
                {/* Header */}
                <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-lime" />

                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
                                How it works
                            </p>
                        </div>

                        <p className="max-w-xs text-xs leading-5 text-primary-foreground/45">
                            No complicated process. Just a simple way to make your political
                            support visible.
                        </p>
                    </div>

                    <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
                        Three steps.
                        <br />
                        <span className="text-primary-foreground/35">One voice.</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="mt-20 border-t border-primary-foreground/15 lg:mt-28">
                    <div className="grid lg:grid-cols-3">
                        {/* Step 01 */}
                        <div className="relative border-b border-primary-foreground/15 py-10 lg:border-b-0 lg:border-r lg:pr-10">
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-bold tracking-[0.15em] text-primary-foreground/40">
                                    01
                                </span>

                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-sm font-black text-accent-foreground">
                                    W
                                </span>
                            </div>

                            <div className="mt-16">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
                                    Choose
                                </p>

                                <h3 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
                                    Pick who you're backing.
                                </h3>

                                <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/55">
                                    Choose the position you want to endorse, then select the
                                    candidate you support.
                                </p>
                            </div>

                            <div className="mt-10 flex gap-2">
                                {["President", "Governor", "Senate"].map((position) => (
                                    <span
                                        key={position}
                                        className="border border-primary-foreground/15 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground/55"
                                    >
                                        {position}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Step 02 */}
                        <div className="relative border-b border-primary-foreground/15 py-10 lg:border-b-0 lg:border-r lg:px-10">
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-bold tracking-[0.15em] text-primary-foreground/40">
                                    02
                                </span>

                                <span className="text-3xl font-black text-coral">“</span>
                            </div>

                            <div className="mt-16">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
                                    Explain
                                </p>

                                <h3 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
                                    Tell us why.
                                </h3>

                                <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/55">
                                    Share up to three short reasons explaining why you're backing
                                    your chosen candidate.
                                </p>
                            </div>

                            <div className="mt-10 border-l-2 border-coral pl-4">
                                <p className="max-w-xs text-sm font-semibold leading-5 text-primary-foreground/75">
                                    “Their ideas speak to the future I want.”
                                </p>
                            </div>
                        </div>

                        {/* Step 03 */}
                        <div className="py-10 lg:pl-10">
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-bold tracking-[0.15em] text-primary-foreground/40">
                                    03
                                </span>

                                <span className="text-2xl font-black text-lime">↗</span>
                            </div>

                            <div className="mt-16">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
                                    Share
                                </p>

                                <h3 className="mt-4 text-3xl font-black tracking-tighter sm:text-4xl">
                                    Make it visible.
                                </h3>

                                <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/55">
                                    Get a shareable card showing your endorsement and reason. Share
                                    it with your friends, family, and community.
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-brand">
                                    W
                                </span>

                                <div>
                                    <div className="h-2 w-24 rounded-full bg-primary-foreground/30" />
                                    <div className="mt-2 h-1.5 w-14 rounded-full bg-primary-foreground/15" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 flex flex-col gap-6 border-t border-primary-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
                    <p className="max-w-md text-xs leading-5 text-primary-foreground/45">
                        Your endorsement is yours to make. Who.ng simply gives you a place to
                        say it.
                    </p>

                    <Button
                        type="button"
                        onClick={onHaveYourSay}
                        className="group inline-flex w-fit items-center gap-4 rounded-full bg-lime py-2 pl-5 pr-2 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-1"
                    >
                        Make your choice

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    )
}
