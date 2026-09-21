import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ElectionType } from "@/types/election";

const steps = [
    {
        path: "/pick",
        label: "Election",
    },
    {
        path: "/pick/location",
        label: "Location",
    },
    {
        path: "/pick/candidate",
        label: "Candidate",
    },
];

function getCurrentStep(pathname: string) {
    if (pathname === "/pick") {
        return 1;
    }

    if (pathname === "/pick/location") {
        return 2;
    }

    if (
        pathname === "/pick/candidate" ||
        pathname === "/pick/success"
    ) {
        return 3;
    }

    return 1;
}

function getStoredElection(): ElectionType | null {
    const storedDraft =
        sessionStorage.getItem("who-ng-pick-draft");

    if (!storedDraft) {
        return null;
    }

    try {
        const draft = JSON.parse(storedDraft);

        return draft.election ?? null;
    } catch {
        return null;
    }
}

export default function PickLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentStep = getCurrentStep(location.pathname);

    function handleBack() {
        if (location.pathname === "/pick") {
            navigate("/");
            return;
        }

        if (location.pathname === "/pick/location") {
            navigate("/pick");
            return;
        }

        if (location.pathname === "/pick/candidate") {
            const election = getStoredElection();

            if (election === "presidential") {
                navigate("/pick");
                return;
            }

            navigate("/pick/location");
        }

        else {
            navigate("/pick")
        }
    }

    const isSuccessPage =
        location.pathname === "/pick/success";

    return (
        <main className="min-h-svh bg-background text-foreground">
            <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                <header className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                    >
                        <ArrowLeft />
                        Back
                    </Button>

                    <div className="ml-auto text-sm font-medium text-muted-foreground">
                        {isSuccessPage
                            ? "Endorsement complete"
                            : `Step ${currentStep} of 3`}
                    </div>
                </header>

                <div className="mt-5">
                    <div
                        className="grid grid-cols-3 gap-2"
                        aria-label={`Step ${currentStep} of 3`}
                    >
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isComplete =
                                isSuccessPage || stepNumber < currentStep;

                            const isCurrent =
                                !isSuccessPage && stepNumber === currentStep;

                            return (
                                <div
                                    key={step.path}
                                    className="space-y-2"
                                >
                                    <div
                                        className={[
                                            "h-1.5 rounded-full transition-colors",
                                            isComplete ||
                                                isCurrent
                                                ? "bg-primary"
                                                : "bg-muted",
                                        ].join(" ")}
                                    />

                                    <p
                                        className={[
                                            "text-xs font-medium",
                                            isCurrent
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                        ].join(" ")}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Outlet />
            </div>
        </main>
    );
}