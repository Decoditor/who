import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
    getUserByEmail,
    loginUser,
} from "@/lib/auth";
import { routes } from "@/routes/routes";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address."),

    password: z
        .string()
        .min(1, "Please enter your password."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (
        values: LoginFormValues,
    ) => {
        const email = values.email
            .trim()
            .toLowerCase();

        const user = getUserByEmail(email);

        if (!user) {
            toast.error("Account not found", {
                description: "No account exists with this email address.",
            });
            return;
        }

        if (!user.verified) {
            toast.info("Email verification required", {
                description: "Verify your email before signing in.",
            });

            await new Promise((resolve) => setTimeout(resolve, 700));

            navigate(
                `${routes.recovery}?email=${encodeURIComponent(email)}`,
            );

            return;
        }

        try {
            loginUser(email, values.password);

            await new Promise((resolve) => setTimeout(resolve, 1200));

            navigate(routes.dashboard);
        } catch (error) {
            toast.error("Unable to sign in", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Invalid email or password.",
            });
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Sign in to access your picks, endorsements, and
                    dashboard.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
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
                                placeholder="Enter your password"
                                autoComplete="current-password"
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

                        <FieldError
                            errors={[
                                form.formState.errors
                                    .password,
                            ]}
                        />
                    </Field>

                    <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? "Signing in..."
                            : "Log in"}

                        {!form.formState.isSubmitting && (
                            <ArrowRight className="size-4" />
                        )}
                    </Button>
                </FieldGroup>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-bold text-foreground underline underline-offset-4 transition-colors hover:text-coral"
                >
                    Create one
                </Link>
            </p>
        </>
    );
}