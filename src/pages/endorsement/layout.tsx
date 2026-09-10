import EndorsementHeader from "@/components/endorsement/header";
import { Outlet, useLocation } from "react-router-dom";

const steps = [
    { path: "/endorsement", label: "Position" },
    { path: "/endorsement/", label: "Candidate" },
    { path: "/endorsement/", label: "Reasons" },
    { path: "/endorsement/", label: "Confirm" },
];

export default function EndorsementLayout() {
    const location = useLocation();

    const getStep = () => {
        if (location.pathname === "/endorsement") {
            return 1;
        }

        if (location.pathname.includes("/reasons")) {
            return 3;
        }

        if (location.pathname.includes("/confirm")) {
            return 4;
        }

        return 2;
    };

    const currentStep = getStep();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <EndorsementHeader />

            <div className="mx-auto max-w-360 px-5 py-6 sm:px-8">
                <div className="flex items-center gap-2 justify">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const active = stepNumber === currentStep;
                        const completed = stepNumber < currentStep;

                        return (
                            <div
                                key={stepNumber}
                                className="flex-1 flex items-center gap-2"
                            >
                                <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active || completed
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {stepNumber}
                                </span>

                                <span
                                    className={`hidden text-xs font-semibold sm:block ${active
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                        }`}
                                >
                                    {step.label}
                                </span>

                                {stepNumber < steps.length && (
                                    <span className={`mx-1 flex-1 h-px w-6 bg-border sm:w-12 ${completed ? "bg-primary" : ""}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mx-auto max-w-7xl flex items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
                <Outlet />
            </div>
        </main>
    );
}