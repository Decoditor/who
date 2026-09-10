import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { candidatesByPosition } from "@/constants";
import { useEndorsement } from "@/contexts/endorsement";
import type { Position } from "@/types";

interface ReasonsFormValues {
    reasonOne: string;
    reasonTwo: string;
    reasonThree: string;
}

export default function EndorsementReasons() {
    const navigate = useNavigate();
    const { position, candidateId } = useParams();
    const { draft, setReasons } = useEndorsement();

    const currentPosition = position as Position;
    const candidate = candidatesByPosition[currentPosition]?.find(
        (item) => item.id === candidateId,
    );

    const form = useForm<ReasonsFormValues>({
        defaultValues: {
            reasonOne: draft.reasons[0] ?? "",
            reasonTwo: draft.reasons[1] ?? "",
            reasonThree: draft.reasons[2] ?? "",
        },
    });

    if (!candidate) {
        navigate("/endorsement");
        return null;
    }

    const onSubmit = (values: ReasonsFormValues) => {
        setReasons([
            values.reasonOne.trim(),
            values.reasonTwo.trim(),
            values.reasonThree.trim(),
        ]);

        navigate(
            `/endorsement/${currentPosition}/${candidate.id}/confirm`,
        );
    };

    return (
        <div className="max-w-2xl w-full">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="border border-border bg-muted p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Your choice
                        </p>

                        <p className="mt-2 text-base font-bold">
                            {candidate.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {candidate.party}
                        </p>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="reasonOne">
                            Reason one
                        </FieldLabel>

                        <Textarea
                            id="reasonOne"
                            placeholder="What matters most to you about this candidate?"
                            maxLength={200}
                            {...form.register("reasonOne", {
                                required: "Please enter a reason.",
                                minLength: {
                                    value: 3,
                                    message: "Please enter a little more detail.",
                                },
                            })}
                        />

                        <FieldError errors={[form.formState.errors.reasonOne]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="reasonTwo">
                            Reason two
                        </FieldLabel>

                        <Textarea
                            id="reasonTwo"
                            placeholder="What else influences your choice?"
                            maxLength={200}
                            {...form.register("reasonTwo", {
                                required: "Please enter a reason.",
                                minLength: {
                                    value: 3,
                                    message: "Please enter a little more detail.",
                                },
                            })}
                        />

                        <FieldError errors={[form.formState.errors.reasonTwo]} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="reasonThree">
                            Reason three
                        </FieldLabel>

                        <Textarea
                            id="reasonThree"
                            placeholder="What's another reason you're backing them?"
                            maxLength={200}
                            {...form.register("reasonThree", {
                                required: "Please enter a reason.",
                                minLength: {
                                    value: 3,
                                    message: "Please enter a little more detail.",
                                },
                            })}
                        />

                        <FieldError errors={[form.formState.errors.reasonThree]} />
                    </Field>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate(`/endorsement/${currentPosition}`)
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>

                        <Button type="submit">
                            Continue
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </FieldGroup>
            </form>

            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Keep your reasons respectful and avoid sharing private information
                about yourself or anyone else.
            </p>
        </div>
    );
}