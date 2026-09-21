import { useState } from "react";
import { Fingerprint, Check } from "lucide-react";

interface FingerprintSelectorProps {
    selected: boolean;
    onSelect: () => void;
    onInvalid: () => void;
}

export default function FingerprintSelector({
    selected,
    onSelect,
}: FingerprintSelectorProps) {
    const [isPressing, setIsPressing] = useState(false);

    function handlePointerDown(
        event: React.PointerEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation();
        setIsPressing(true);
    }

    function handlePointerUp(
        event: React.PointerEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation();
        setIsPressing(false);
        onSelect();
    }

    function handlePointerCancel(
        event: React.PointerEvent<HTMLButtonElement>,
    ) {
        event.stopPropagation();
        setIsPressing(false);
    }

    return (
        <button
            type="button"
            aria-label={
                selected
                    ? "Candidate selected"
                    : "Press fingerprint to select candidate"
            }
            aria-pressed={selected}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={() => setIsPressing(false)}
            onClick={(event) => {
                event.stopPropagation();
            }}
            className={[
                "group relative flex shrink-0 touch-none select-none",
                "items-center justify-center rounded-full",
                "transition-transform duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-primary focus-visible:ring-offset-2",
                isPressing ? "scale-95" : "scale-100",
            ].join(" ")}
        >
            {/* <span
                className={[
                    "absolute inset-0 rounded-full transition-opacity",
                    selected
                        ? "bg-primary/15 opacity-100"
                        : "bg-muted opacity-0 group-hover:opacity-100",
                ].join(" ")}
            /> */}

            <span
                className={[
                    "relative flex size-16 items-center justify-center",
                    "rounded-full border-2 transition-all",
                    selected
                        ? "border-primary bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-background text-muted-foreground group-hover:border-primary/60",
                ].join(" ")}
            >
                {selected ? (
                    <Check className="size-7" strokeWidth={2.5} />
                ) : (
                    <Fingerprint className="size-8" />
                )}
            </span>

            <span
                className={[
                    "absolute -bottom-6 whitespace-nowrap text-[9px]",
                    "font-bold uppercase tracking-[0.12em]",
                    selected
                        ? "text-primary"
                        : "text-muted-foreground",
                ].join(" ")}
            >
                {selected ? "Selected" : "Press to select"}
            </span>
        </button>
    );
}