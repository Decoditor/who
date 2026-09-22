import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navigation = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Why Who.ng", href: "#why-who" },
    { label: "Live", href: "/dashboard/live" },
];
interface HeaderProps {
    onHaveYourSay: () => void;
}
export default function Header({ onHaveYourSay }: HeaderProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-360 items-center justify-between">
                {/* Brand */}
                <Link
                    to="/"
                    className="group flex items-center gap-2"
                    aria-label="Who.ng home"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123B35] text-white transition-transform duration-300 group-hover:rotate-6">
                        <span className="text-lg font-black tracking-[-0.08em]">W</span>
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-[15px] font-bold tracking-[-0.03em] text-[#123B35]">
                            who.ng
                        </p>
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#123B35]/55">
                            Your voice. Your choice.
                        </p>
                    </div>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-1 rounded-full border border-[#123B35]/10 bg-[#F4F0E8]/75 p-1.5 backdrop-blur-md md:flex">
                    {navigation.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="rounded-full px-5 py-2.5 text-[13px] font-medium text-[#123B35]/70 transition-colors hover:bg-white hover:text-[#123B35]"
                        >
                            {item.label}
                        </a>
                    ))}

                    <Button
                        onClick={onHaveYourSay}
                        className="ml-1 flex items-center gap-2 rounded-full bg-[#123B35] px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                        Pick your choice
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123B35] text-white md:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile navigation */}
            {mobileOpen && (
                <div className="mx-auto mt-3 max-w-360 rounded-[24px] border border-[#123B35]/10 bg-[#F4F0E8]/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
                    <nav className="flex flex-col gap-1">
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#123B35]/75 hover:bg-white"
                            >
                                {item.label}
                            </a>
                        ))}

                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="mt-1 flex items-center justify-between rounded-2xl bg-[#123B35] px-4 py-3 text-sm font-semibold text-white"
                        >
                            Log in
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}