import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

import { createUser } from "@/lib/auth";

const signupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Please enter your name."),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),

        state: z
            .string()
            .min(1, "Please select your state."),

        lga: z
            .string()
            .min(1, "Please select your LGA."),

        isAdult: z
            .boolean()
            .refine(
                (value) => value,
                "You must confirm that you are 18 or older.",
            ),
    })
    .refine(
        (values) => values.password === values.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        },
    );

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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            state: "",
            lga: "",
            isAdult: false,
        },
    });

    const selectedState = form.watch("state");

    const availableLgas =
        lgasByState[selectedState] ?? [];

    const handleStateChange = (value: string) => {
        form.setValue("state", value, {
            shouldValidate: true,
        });

        form.setValue("lga", "", {
            shouldValidate: false,
        });
    };

    const onSubmit = async (
        values: SignupFormValues,
    ) => {
        try {
            createUser({
                name: values.name,
                email: values.email,
                password: values.password,
            });

            await new Promise((resolve) =>
                setTimeout(resolve, 1200),
            );

            navigate(
                `/recovery-code?email=${encodeURIComponent(
                    values.email,
                )
                }`,
            );
        } catch (error) {
            form.setError("root", {
                message:
                    error instanceof Error
                        ? error.message
                        : "Unable to create account.",
            });
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Create your account
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Join who.ng to make picks, share your endorsements,
                    and keep track of your activity.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">
                            Name
                        </FieldLabel>

                        <Input
                            id="name"
                            placeholder="Enter your name"
                            autoComplete="name"
                            {...form.register("name")}
                        />

                        <FieldError
                            errors={[
                                form.formState.errors.name,
                            ]}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...form.register("email")}
                        />

                        <FieldError
                            errors={[
                                form.formState.errors.email,
                            ]}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="pr-10"
                                {...form.register("password")}
                            />

                            <button
                                type="button"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                onClick={() =>
                                    setShowPassword(
                                        (value) => !value,
                                    )
                                }
                                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        <FieldDescription>
                            Password must be at least 8
                            characters.
                        </FieldDescription>

                        <FieldError
                            errors={[
                                form.formState.errors.password,
                            ]}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Confirm password
                        </FieldLabel>

                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password again"
                                autoComplete="new-password"
                                className="pr-10"
                                {...form.register(
                                    "confirmPassword",
                                )}
                            />

                            <button
                                type="button"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (value) => !value,
                                    )
                                }
                                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>

                        <FieldError
                            errors={[
                                form.formState.errors
                                    .confirmPassword,
                            ]}
                        />
                    </Field>

                    <Field>
                        <FieldLabel>State</FieldLabel>

                        <Combobox
                            items={states}
                            value={selectedState}
                            onValueChange={(value) =>
                                handleStateChange(
                                    value ?? "",
                                )
                            }
                        >
                            <ComboboxInput placeholder="Select your state" />

                            <ComboboxContent>
                                <ComboboxEmpty>
                                    No state found.
                                </ComboboxEmpty>

                                <ComboboxList>
                                    {(state) => (
                                        <ComboboxItem
                                            key={state}
                                            value={state}
                                        >
                                            {state}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        <FieldError
                            errors={[
                                form.formState.errors.state,
                            ]}
                        />
                    </Field>

                    <Field>
                        <FieldLabel>LGA</FieldLabel>

                        <Combobox
                            items={availableLgas}
                            value={form.watch("lga")}
                            onValueChange={(value) =>
                                form.setValue(
                                    "lga",
                                    value ?? "",
                                    {
                                        shouldValidate:
                                            true,
                                    },
                                )
                            }
                        >
                            <ComboboxInput
                                disabled={
                                    !selectedState ||
                                    availableLgas.length === 0
                                }
                                placeholder={
                                    selectedState
                                        ? "Select your LGA"
                                        : "Select your state first"
                                }
                            />

                            <ComboboxContent>
                                <ComboboxEmpty>
                                    No LGA found.
                                </ComboboxEmpty>

                                <ComboboxList>
                                    {(lga) => (
                                        <ComboboxItem
                                            key={lga}
                                            value={lga}
                                        >
                                            {lga}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        <FieldDescription>
                            Your location helps personalize
                            election results.
                        </FieldDescription>

                        <FieldError
                            errors={[
                                form.formState.errors.lga,
                            ]}
                        />
                    </Field>

                    <Field>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="isAdult"
                                checked={form.watch(
                                    "isAdult",
                                )}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        "isAdult",
                                        checked === true,
                                        {
                                            shouldValidate:
                                                true,
                                        },
                                    )
                                }
                            />

                            <div className="grid gap-1">
                                <FieldLabel
                                    htmlFor="isAdult"
                                    className="cursor-pointer font-medium"
                                >
                                    I confirm that I am 18
                                    years old or older.
                                </FieldLabel>

                                <FieldDescription>
                                    Who.ng is currently
                                    available to Nigerians
                                    aged 18 and above.
                                </FieldDescription>
                            </div>
                        </div>

                        <FieldError
                            errors={[
                                form.formState.errors.isAdult,
                            ]}
                        />
                    </Field>

                    <FieldError
                        errors={[
                            form.formState.errors.root,
                        ]}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? "Creating account..."
                            : "Continue"}

                        {!form.formState.isSubmitting && (
                            <ArrowRight className="size-4" />
                        )}
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