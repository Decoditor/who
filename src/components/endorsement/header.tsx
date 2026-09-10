import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EndorsementHeader() {
    return (
        <header className="border-b border-border">
            <div className="mx-auto flex max-w-360 items-center justify-between px-5 py-5 sm:px-8">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    aria-label="Who.ng home"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                        W
                    </span>

                    <span className="text-base font-black tracking-tighter">
                        who.ng
                    </span>
                </Link>

                <Link
                    to="/"
                    className="flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Exit
                </Link>
            </div>
        </header>
    )
}
