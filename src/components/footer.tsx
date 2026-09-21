import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const footerLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Why Who.ng", href: "#why-who" },
    { label: "Log in", href: "/login" },
];

interface FooterProps {
    onHaveYourSay: () => void;
}

export default function Footer({
    onHaveYourSay,
}: FooterProps) {
    return (
        <footer className="bg-primary px-5 py-6 text-primary-foreground sm:px-8 lg:py-20">
            <div className="mx-auto max-w-360">
                {/* Main */}
                <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
                    {/* Brand statement */}
                    <div>
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3"
                            aria-label="Who.ng home"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-lg font-black text-accent-foreground transition-transform group-hover:rotate-6">
                                W
                            </span>

                            <span className="text-xl font-black tracking-tighter">
                                who.ng
                            </span>
                        </Link>

                        <h2 className="mt-12 max-w-3xl text-5xl font-black leading-none tracking-tighter sm:text-6xl lg:text-8xl">
                            Say who
                            <br />
                            you're backing.
                        </h2>

                        <p className="mt-8 max-w-md text-sm leading-relaxed text-primary-foreground/50">
                            A place for Nigerians to publicly share who they support and why.
                        </p>

                        <Button
                            type="button"
                            onClick={onHaveYourSay}
                            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-lime py-2 pl-5 pr-2 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-1"
                        >
                            Make your choice

                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </Button>
                    </div>

                    {/* Navigation */}
                    <div className="lg:flex lg:justify-end">
                        <div className="w-full max-w-xs">
                            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-primary-foreground/35">
                                Explore
                            </p>

                            <nav className="flex flex-col">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.href}
                                        className="flex items-center justify-between border-t border-primary-foreground/10 py-4 text-sm font-semibold transition-colors hover:text-lime"
                                    >
                                        {link.label}

                                        <ArrowUpRight className="h-4 w-4 opacity-30" />
                                    </Link>
                                ))}
                            </nav>

                            <div className="sm:mt-12 border-t border-primary-foreground/10 py-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/35">
                                    Who.ng
                                </p>

                                <p className="mt-4 text-xs leading-relaxed text-primary-foreground/45">
                                    Independent. Privately run. Non-partisan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="sm:mt-20 border-t border-primary-foreground/10 pt-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                        <p className="max-w-3xl text-xs leading-relaxed text-primary-foreground/40">
                            Who.ng is not affiliated with, endorsed by, or connected to INEC.
                            An endorsement on Who.ng is not an official vote and does not
                            affect official election results.
                        </p>

                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground/35">
                            <span className="h-2 w-2 rounded-full bg-lime" />
                            Independent platform
                        </span>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex gap-4 border-t border-primary-foreground/10 pt-4 items-center justify-between">
                    <p className="text-xs text-primary-foreground/30">
                        © {new Date().getFullYear()} Who.ng
                    </p>

                    <p className="text-xs text-primary-foreground/30">
                        Your voice. Your choice.
                    </p>
                </div>
            </div>
        </footer>
    );
}