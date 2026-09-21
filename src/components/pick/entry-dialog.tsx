import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import type { ContactType } from "@/types/pick";


interface PickEntryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PickEntryDialog({
    open,
    onOpenChange,
}: PickEntryDialogProps) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contactType, setContactType] =
        useState<ContactType>("email");
    const [contactValue, setContactValue] = useState("");

    const isValid =
        name.trim().length >= 2 &&
        contactValue.trim().length > 0;

    function handleContinue() {
        if (!isValid) return;

        sessionStorage.setItem(
            "who-ng-pick-entry",
            JSON.stringify({
                name: name.trim(),
                contactType,
                contactValue: contactValue.trim(),
            }),
        );

        onOpenChange(false);
        navigate("/pick");
    }

    function handleContactTypeChange(value: string) {
        const nextType = value as ContactType;

        setContactType(nextType);
        setContactValue("");
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl! w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tight sm:text-3xl">
                        Have your say
                    </DialogTitle>

                    <DialogDescription className=" leading-6">
                        Tell us who you are so we can protect the
                        integrity of your pick.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="pick-name">
                            Your name
                        </Label>

                        <Input
                            id="pick-name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your name"
                            autoComplete="name"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>How should we reach you?</Label>

                        <RadioGroup
                            value={contactType}
                            onValueChange={handleContactTypeChange}
                            className="grid grid-cols-2 gap-3"
                        >
                            <Label
                                htmlFor="contact-email"
                                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                            >
                                <RadioGroupItem
                                    id="contact-email"
                                    value="email"
                                />

                                <span>
                                    <span className="block text-sm font-semibold">
                                        Email
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        Use your email address
                                    </span>
                                </span>
                            </Label>

                            <Label
                                htmlFor="contact-phone"
                                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                            >
                                <RadioGroupItem
                                    id="contact-phone"
                                    value="phone"
                                />

                                <span>
                                    <span className="block text-sm font-semibold">
                                        Phone
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        Use your phone number
                                    </span>
                                </span>
                            </Label>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-value">
                            {contactType === "email"
                                ? "Email address"
                                : "Phone number"}
                        </Label>

                        <Input
                            id="contact-value"
                            type={
                                contactType === "email"
                                    ? "email"
                                    : "tel"
                            }
                            inputMode={
                                contactType === "email"
                                    ? "email"
                                    : "tel"
                            }
                            value={contactValue}
                            onChange={(event) =>
                                setContactValue(event.target.value)
                            }
                            placeholder={
                                contactType === "email"
                                    ? "you@example.com"
                                    : "0800 000 0000"
                            }
                            autoComplete={
                                contactType === "email"
                                    ? "email"
                                    : "tel"
                            }
                        />
                    </div>

                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                        <p className="text-xs leading-5 text-muted-foreground">
                            Your contact detail helps us prevent
                            duplicate or abusive submissions. We
                            won't display it publicly with your pick.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={!isValid}
                        onClick={handleContinue}
                    >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}