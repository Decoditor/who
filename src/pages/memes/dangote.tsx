import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MemeCardPreview } from "@/components/memes/preview";
import { MemeFieldEditor } from "@/components/memes/editor";
import { AutoBreadcrumb } from "@/components/auto-crumb";
import { dangoteTemplates } from "@/data/memes";
import { downloadMemeCard, shareMemeCard } from "@/lib/memes";
import { routes } from "@/routes/routes";
import type { MemeTemplate } from "@/types/memes";


function getTemplateValues(
    template: MemeTemplate,
    currentValues: Record<string, string | number | boolean>,
) {
    const nextValues: Record<
        string,
        string | number | boolean
    > = {};

    template.fields.forEach((field) => {
        if (currentValues[field.id] !== undefined) {
            nextValues[field.id] = currentValues[field.id];
        }
    });

    return nextValues;
}

export default function DangoteMemes() {
    const { template: templateSlug } = useParams();
    const navigate = useNavigate();

    const previewRef = useRef<HTMLDivElement>(null);

    const [photoUrl, setPhotoUrl] = useState("");
    const [validationMessage, setValidationMessage] =
        useState<string | null>(null);

    const template = useMemo(() => {
        if (!templateSlug) {
            return dangoteTemplates[0];
        }

        return (
            dangoteTemplates.find(
                (item) => item.slug === templateSlug,
            ) ?? dangoteTemplates[0]
        );
    }, [templateSlug]);

    useEffect(() => {
        if (templateSlug && !template) {
            navigate(routes.dangoteMemes, { replace: true });
        }
    }, [navigate, template, templateSlug]);

    const [values, setValues] = useState<
        Record<string, string | number | boolean>
    >({
        company: "Dangote Group",
        role: "Partner",
    });

    function updateValue(
        fieldId: string,
        value: string | number | boolean,
    ) {
        setValues((current) => ({
            ...current,
            [fieldId]: value,
        }));
    }

    function selectTemplate(nextTemplateSlug: string) {
        const nextTemplate = dangoteTemplates.find(
            (item) => item.slug === nextTemplateSlug,
        );

        if (!nextTemplate || nextTemplate.id === template.id) {
            return;
        }

        setValues((current) =>
            getTemplateValues(
                nextTemplate,
                current,
            ),
        );

        navigate(
            `${routes.dangoteMemes}/${nextTemplateSlug}`,
        );
    }

    async function downloadCard() {
        if (!previewRef.current) return;

        if (!validateCard()) return;

        try {
            await downloadMemeCard(
                previewRef.current,
                `who-ng-${template.slug}.png`,
            );
        } catch {
            setValidationMessage(
                "We couldn't create your card. Please try again.",
            );
        }
    }

    async function shareCard() {
        if (!previewRef.current) return;

        if (!validateCard()) return;

        try {
            const shared = await shareMemeCard(
                previewRef.current,
                `I created my ${template.name} card on who.ng.`,
                `who-ng-${template.slug}.png`,
            );

            if (!shared) {
                await downloadMemeCard(
                    previewRef.current,
                    `who-ng-${template.slug}.png`,
                );
            }
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            setValidationMessage(
                "We couldn't share your card. Try downloading it instead.",
            );
        }
    }

    function handlePhotoChange(file: File | undefined) {
        if (!file) return;

        const nextUrl = URL.createObjectURL(file);

        setPhotoUrl((currentUrl) => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }

            return nextUrl;
        });

        setValues((current) => ({
            ...current,
            photo: nextUrl,
        }));
    }

    useEffect(() => {
        return () => {
            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
            }
        };
    }, [photoUrl]);

    function validateCard() {
        const missingFields = template.fields.filter(
            (field) =>
                field.required &&
                !values[field.id],
        );

        if (missingFields.length > 0) {
            const names = missingFields
                .map((field) => field.label)
                .join(", ");

            setValidationMessage(
                `Please complete: ${names}.`,
            );

            return false;
        }

        if (
            template.id === "dangote-shareholder" &&
            values.confirmed !== true
        ) {
            setValidationMessage(
                "Please confirm that the shares have actually been allotted to you before creating a shareholder card.",
            );

            return false;
        }

        return true;
    }

    if (!template) {
        return null;
    }

    return (
        <main>
            <AutoBreadcrumb />

            <section className="border-b border-border">
                <div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Dangote creator
                    </p>

                    <h1 className="mt-2 text-4xl font-black tracking-tighter sm:text-5xl">
                        Create your card
                    </h1>

                    <p className="mt-4 max-w-2xl text-muted-foreground">
                        Choose a design, add your details and preview your
                        card before sharing it.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
                    <div className="flex max-w-2xl justify-center lg:sticky lg:top-8 lg:self-start">
                        <MemeCardPreview
                            template={template}
                            values={values}
                            previewRef={previewRef}
                        />
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Choose a template
                                </CardTitle>

                                <CardDescription>
                                    Start with a design and customize the
                                    details.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-3">
                                    {dangoteTemplates.map((item) => {
                                        const isSelected =
                                            item.id === template.id;

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                aria-pressed={isSelected}
                                                onClick={() =>
                                                    selectTemplate(
                                                        item.slug,
                                                    )
                                                }
                                                className={`group flex items-center gap-4 rounded-xl border p-3 text-left transition ${isSelected
                                                    ? "border-primary bg-muted"
                                                    : "hover:bg-muted/50"
                                                    }`}
                                            >
                                                <div className="flex aspect-4/5 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
                                                    <span className="px-2 text-center text-[9px] font-black uppercase leading-tight">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="space-y-5 p-5">
                                <div>
                                    <p className="text-sm font-bold">
                                        Your details
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Everything updates on the card as
                                        you type.
                                    </p>
                                </div>

                                {template.fields.map((field) => (
                                    <MemeFieldEditor
                                        key={field.id}
                                        field={field}
                                        value={values[field.id]}
                                        onChange={(value) =>
                                            updateValue(
                                                field.id,
                                                value,
                                            )
                                        }
                                        onImageChange={
                                            field.type === "image"
                                                ? handlePhotoChange
                                                : undefined
                                        }
                                    />
                                ))}
                            </CardContent>
                        </Card>

                        {template.id === "dangote-shareholder" && (
                            <Card>
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="disclaimer"
                                            checked={
                                                values.confirmed === true
                                            }
                                            onCheckedChange={(checked) =>
                                                updateValue(
                                                    "confirmed",
                                                    checked === true,
                                                )
                                            }
                                        />

                                        <Label
                                            htmlFor="disclaimer"
                                            className="text-sm leading-relaxed text-muted-foreground"
                                        >
                                            I understand that the
                                            shareholder wording should only
                                            be used if shares have actually
                                            been allotted to me.
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                size="lg"
                                onClick={downloadCard}
                            >
                                <Download data-icon="inline-start" />
                                Download
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={shareCard}
                            >
                                <Share2 data-icon="inline-start" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <AlertDialog
                open={validationMessage !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setValidationMessage(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Your card needs a little more information
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {validationMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction>
                            Got it
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}