import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import {
    getUserByEmail,
    verifyUser,
} from "@/lib/auth";
import { routes } from "@/routes/routes";

const DEMO_OTP = "123456";

export default function RecoveryCode() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const email =
        searchParams.get("email") ?? "";

    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const handleSubmit = async (
        event: React.FormEvent,
    ) => {
        event.preventDefault();

        if (otp.length !== 6) {
            toast.error("Enter the complete OTP", {
                description:
                    "Please enter the 6-digit code sent to your email.",
            });

            return;
        }

        if (otp !== DEMO_OTP) {
            toast.error("Invalid OTP", {
                description:
                    "The verification code is incorrect.",
            });

            return;
        }

        const user = getUserByEmail(email);

        if (!user) {
            toast.error("Account not found", {
                description:
                    "We could not find an account for this email.",
            });

            return;
        }

        setIsSubmitting(true);

        verifyUser(email);

        await new Promise((resolve) =>
            setTimeout(resolve, 1200),
        );

        toast.success("Email verified", {
            description:
                "Your account has been verified. You can now sign in.",
        });

        navigate(routes.dashboard);
    };

    return (
        <div>
            <div className="mb-8">
                <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Mail className="size-5" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                    Verify your email
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Enter the 6-digit verification code sent
                    to{" "}
                    <span className="font-medium text-foreground">
                        {email || "your email"}
                    </span>
                    .
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-7">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        disabled={isSubmitting}
                        containerClassName="w-full justify-center"
                        className="w-full"
                    >
                        <InputOTPGroup className="w-full justify-center">
                            <InputOTPSlot
                                index={0}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                            <InputOTPSlot
                                index={1}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                            <InputOTPSlot
                                index={2}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                            <InputOTPSlot
                                index={3}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                            <InputOTPSlot
                                index={4}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                            <InputOTPSlot
                                index={5}
                                className="size-12 text-lg font-semibold sm:size-14 sm:text-xl"
                            />
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="text-center text-xs text-muted-foreground">
                        Development OTP:{" "}
                        <span className="font-bold text-foreground">
                            {DEMO_OTP}
                        </span>
                    </p>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={
                            isSubmitting ||
                            otp.length !== 6
                        }
                    >
                        {isSubmitting
                            ? "Verifying..."
                            : "Verify email"}

                        {!isSubmitting && (
                            <ArrowRight className="size-4" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}