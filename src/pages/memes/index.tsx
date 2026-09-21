import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { MemeTemplateCard } from "@/components/memes/template-card";
import {
    dangoteCollection,
    dangoteTemplates,
} from "@/data/memes";
import { AutoBreadcrumb } from "@/components/auto-crumb";

export default function Memes() {
    return (
        <main>
            <section className="border-b border-border mt-4">
                <AutoBreadcrumb />

                <div className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl">
                            Create a card worth sharing.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            Pick a design, add your details, make it yours,
                            then download or share it.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-360 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            Featured collection
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                            {dangoteCollection.name}
                        </h2>

                        <p className="mt-3 max-w-2xl text-muted-foreground">
                            {dangoteCollection.description}
                        </p>
                    </div>

                    <Link to="/memes/dangote">

                        <Button variant="outline">
                            Open creator
                            <ArrowRight />
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {dangoteTemplates.map((template) => (
                        <MemeTemplateCard
                            key={template.id}
                            template={template}
                            href={`/memes/dangote/${template.slug}`}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}