import { ArrowRight, Copy, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";

export default function RecoveryCode() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    // Temporary code until the backend provides the real recovery code.
    const recoveryCode = "WNG-7K4P-92XM";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(recoveryCode);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleContinue = () => {
        if (!saved) return;

        navigate("/endorsement");
    };

    return (
        <>
            <div className="space-y-8">
                {/* Important notice */}
                <div className="flex gap-4 border border-border bg-muted p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-sm font-bold">
                            Keep this code somewhere safe.
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Anyone with this code may be able to access your Who.ng account.
                            Don't share it publicly.
                        </p>
                    </div>
                </div>

                {/* Recovery code */}
                <div>
                    <FieldLabel htmlFor="recovery-code">Your recovery code</FieldLabel>

                    <div className="mt-2 flex items-center gap-2">
                        <div
                            id="recovery-code"
                            className="flex min-h-12 flex-1 items-center border border-border bg-background px-4 font-mono text-sm font-bold tracking-widest"
                        >
                            {recoveryCode}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleCopy}
                            aria-label="Copy recovery code"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>

                    <FieldDescription className="mt-2">
                        {copied ? "Recovery code copied." : "Write it down or save it securely."}
                    </FieldDescription>
                </div>

                {/* Confirmation */}
                <Field>
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="saved-code"
                            checked={saved}
                            onCheckedChange={(checked) => setSaved(checked === true)}
                        />

                        <div className="grid gap-1">
                            <FieldLabel
                                htmlFor="saved-code"
                                className="cursor-pointer font-medium"
                            >
                                I have saved my recovery code.
                            </FieldLabel>

                            <FieldDescription>
                                I understand that I may not be able to log in on another
                                device without it.
                            </FieldDescription>
                        </div>
                    </div>

                    {!saved && (
                        <FieldError>
                            Please confirm that you've saved your recovery code.
                        </FieldError>
                    )}
                </Field>

                <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    disabled={!saved}
                    onClick={handleContinue}
                >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-foreground underline underline-offset-4 transition-colors hover:text-coral"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </>
    );
}