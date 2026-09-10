import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10 lg:px-14">
            <Link to="/" className="text-xl font-bold tracking-tight">
                who.ng
            </Link>

            <Link
                to="/endorsement"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
            >
                Make an endorsement
                <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
            </Link>
        </header>
    );
}