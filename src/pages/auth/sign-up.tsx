import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";

const signupSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters.")
        .max(30, "Username must not exceed 30 characters.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores.",
        ),

    state: z.string().min(1, "Please select your state."),

    lga: z.string().min(1, "Please select your LGA."),

    isAdult: z
        .boolean()
        .refine((value) => value, "You must confirm that you are 18 or older."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory",
];

const lgasByState: Record<string, string[]> = {
    Oyo: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo East",
        "Oyo West",
        "Saki East",
        "Saki West",
        "Surulere",
    ],
};

export default function Signup() {
    const navigate = useNavigate();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            state: "",
            lga: "",
            isAdult: false,
        },
    });

    const selectedState = form.watch("state");

    const availableLgas = lgasByState[selectedState] ?? [];

    const handleStateChange = (value: string) => {
        form.setValue("state", value as string, {
            shouldValidate: true,
        });

        form.setValue("lga", "", {
            shouldValidate: false,
        });
    };

    const onSubmit = (values: SignupFormValues) => {
        console.log("Signup data:", values);

        navigate("/recovery-code");
    };

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    {/* Username */}
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>

                        <Input
                            id="username"
                            placeholder="e.g. samad_01"
                            autoComplete="username"
                            {...form.register("username")}
                        />

                        <FieldDescription>
                            This is the name people will see with your endorsement.
                        </FieldDescription>

                        <FieldError errors={[form.formState.errors.username]} />
                    </Field>

                    {/* State */}
                    <Field>
                        <FieldLabel>State</FieldLabel>

                        <Combobox items={states} value={form.watch("state")} onValueChange={(value) => handleStateChange(value ?? "")}>
                            <ComboboxInput placeholder="Select your state" />
                            <ComboboxContent>
                                <ComboboxEmpty>No state found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(state) => (
                                        <ComboboxItem key={state} value={state}>
                                            {state}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        <FieldError errors={[form.formState.errors.state]} />
                    </Field>

                    {/* LGA */}
                    <Field>
                        <FieldLabel>LGA</FieldLabel>

                        <Combobox
                            items={availableLgas}
                            value={form.watch("lga")}
                            onValueChange={(value) =>
                                form.setValue("lga", value ?? "", {
                                    shouldValidate: true,
                                })}>
                            <ComboboxInput
                                disabled={!selectedState || availableLgas.length === 0}
                                placeholder={
                                    selectedState ? "Select your LGA" : "Select your state first"
                                }
                            />

                            <ComboboxContent>
                                <ComboboxEmpty>No LGA found.</ComboboxEmpty>

                                <ComboboxList>
                                    {(lga) => (
                                        <ComboboxItem key={lga} value={lga}>
                                            {lga}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        <FieldDescription>
                            Your location helps personalize Governor and Senate results.
                        </FieldDescription>

                        <FieldError errors={[form.formState.errors.lga]} />
                    </Field>

                    {/* Age confirmation */}
                    <Field>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="isAdult"
                                checked={form.watch("isAdult")}
                                onCheckedChange={(checked) =>
                                    form.setValue("isAdult", checked === true, {
                                        shouldValidate: true,
                                    })
                                }
                            />

                            <div className="grid gap-1">
                                <FieldLabel
                                    htmlFor="isAdult"
                                    className="cursor-pointer font-medium"
                                >
                                    I confirm that I am 18 years old or older.
                                </FieldLabel>

                                <FieldDescription>
                                    Who.ng is currently available to Nigerians aged 18 and
                                    above.
                                </FieldDescription>
                            </div>
                        </div>

                        <FieldError errors={[form.formState.errors.isAdult]} />
                    </Field>

                    {/* Submit */}
                    <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        Continue

                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </FieldGroup>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-bold text-foreground underline underline-offset-4 transition-colors hover:text-coral"
                >
                    Log in
                </Link>
            </p>
        </>
    );
}