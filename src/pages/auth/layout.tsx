import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
    const location = useLocation();
    const isSignup = location.pathname === "/signup";

    return (
        <main className="min-h-screen bg-muted p-3 text-foreground sm:p-5 lg:p-8">
            <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-360 overflow-hidden rounded-3xl bg-card shadow-2xl sm:min-h-[calc(100svh-2.5rem)] lg:grid-cols-2">
                {/* Visual panel */}
                <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
                    <div className="absolute inset-0">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime opacity-10" />
                        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-coral opacity-15" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between p-8">
                        <Link
                            to="/"
                            className="group flex items-center gap-3"
                            aria-label="Who.ng home"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-sm font-black text-accent-foreground transition-transform group-hover:rotate-6">
                                W
                            </span>

                            <span className="text-lg font-black tracking-tighter">
                                who.ng
                            </span>
                        </Link>

                        <Link
                            to="/"
                            className="flex items-center gap-2 rounded-full border border-primary-foreground/15 px-4 py-2 text-xs font-semibold text-primary-foreground/70 transition-colors hover:border-primary-foreground/30 hover:text-primary-foreground"
                        >
                            Back
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="relative flex min-h-[calc(100svh-10rem)] items-center justify-center px-10">
                        <div className="relative w-full max-w-2xl">
                            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-8xl font-black leading-none tracking-tighter text-primary-foreground/5 xl:text-9xl">
                                WHO
                            </div>

                            <div className="relative mx-auto max-w-md -rotate-2 bg-background p-6 text-foreground shadow-2xl transition-transform duration-500 hover:rotate-0">
                                <div className="flex items-center justify-between border-b border-border pb-5">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            My endorsement
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Who I'm backing
                                        </p>
                                    </div>

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                                        W
                                    </span>
                                </div>

                                <div className="flex items-center gap-5 py-8">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-coral">
                                        <span className="text-2xl font-black text-primary-foreground">
                                            ?
                                        </span>
                                    </div>

                                    <div>
                                        <div className="h-3 w-32 rounded-full bg-primary" />
                                        <div className="mt-3 h-2 w-20 rounded-full bg-primary/15" />

                                        <span className="mt-5 inline-flex items-center gap-2 bg-lime px-3 py-1.5 text-xs font-bold text-accent-foreground">
                                            Backing
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-5">
                                    <p className="text-xl font-bold leading-tight tracking-tight">
                                        Your choice.
                                        <br />
                                        Your reason.
                                        <br />
                                        Your voice.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-primary-foreground/10 pt-5">
                        <p className="max-w-xs text-xs leading-relaxed text-primary-foreground/40">
                            A place for Nigerians to say who they're backing, and why.
                        </p>

                        <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/30">
                            {isSignup ? "Join Who.ng" : "Welcome back"}
                        </span>
                    </div>
                </div>

                {/* Page content */}
                <div className="flex min-h-full flex-col bg-card">
                    <header className="flex items-center justify-between p-5 lg:hidden">
                        <Link
                            to="/"
                            className="group flex items-center gap-3"
                            aria-label="Who.ng home"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground transition-transform group-hover:rotate-6">
                                W
                            </span>

                            <span className="text-base font-black tracking-tighter">
                                who.ng
                            </span>
                        </Link>

                        <Link
                            to="/"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </header>

                    <div className="flex flex-1 items-center px-5 py-10 sm:px-10 lg:px-16 xl:px-20">
                        <div className="mx-auto w-full max-w-lg">
                            <Outlet />
                        </div>
                    </div>

                    <footer className="border-t border-border px-5 py-5 sm:px-10 lg:px-16 xl:px-20">
                        <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground">
                            Who.ng is independent and privately run. It is not affiliated
                            with, endorsed by, or connected to INEC.
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
}