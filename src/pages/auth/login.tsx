import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Please enter your username."),

    recoveryCode: z
        .string()
        .trim()
        .min(1, "Please enter your recovery code."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            recoveryCode: "",
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        console.log("Login data:", values);

        // Temporary until the backend authentication endpoint is connected.
        navigate("/");
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
                            placeholder="Enter your username"
                            autoComplete="username"
                            {...form.register("username")}
                        />

                        <FieldError errors={[form.formState.errors.username]} />
                    </Field>

                    {/* Recovery code */}
                    <Field>
                        <FieldLabel htmlFor="recoveryCode">
                            Recovery code
                        </FieldLabel>

                        <Input
                            id="recoveryCode"
                            placeholder="Enter your recovery code"
                            autoComplete="off"
                            {...form.register("recoveryCode")}
                        />

                        <FieldDescription>
                            Use the recovery code you received when you created your
                            Who.ng account.
                        </FieldDescription>

                        <FieldError errors={[form.formState.errors.recoveryCode]} />
                    </Field>

                    <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        Log in
                        <ArrowRight className="h-4 w-4" />
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