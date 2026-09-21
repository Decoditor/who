import { Link } from "react-router-dom";

import {
    Card,
} from "@/components/ui/card";
import type { MemeTemplate } from "@/types/memes";

interface MemeTemplateCardProps {
    template: MemeTemplate;
    href: string;
}

export function MemeTemplateCard({
    template,
    href,
}: MemeTemplateCardProps) {
    return (
        <Link to={href}>
            <Card className="group overflow-hidden flex h-full items-center justify-center border-border/70 bg-primary text-primary-foreground aspect-4/5 p-6">
                <div className="w-full max-w-xs border border-primary-foreground/20 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
                        who.ng
                    </p>

                    <p className="mt-8 text-3xl font-black uppercase leading-none tracking-tight">
                        {template.name}
                    </p>

                    <div className="mt-8 h-32 bg-primary-foreground/10" />

                    <p className="mt-5 text-xs uppercase tracking-widest text-primary-foreground/50">
                        Preview
                    </p>
                </div>
            </Card>
        </Link>
    );
}