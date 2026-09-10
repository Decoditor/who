import type { Position } from "@/types";

interface PositionTabsProps {
    value: Position;
    onChange: (position: Position) => void;
}

const positions: { value: Position; label: string }[] = [
    {
        value: "president",
        label: "President",
    },
    {
        value: "governor",
        label: "Governor",
    },
    {
        value: "senate",
        label: "Senate",
    },
];

export function PositionTabs({
    value,
    onChange,
}: PositionTabsProps) {
    return (
        <div className="flex border-b border-border">
            {positions.map((position) => {
                const active = position.value === value;

                return (
                    <button
                        key={position.value}
                        type="button"
                        onClick={() => onChange(position.value)}
                        className={`relative px-4 py-3 text-sm font-semibold transition-colors sm:px-6 ${active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {position.label}

                        {active && (
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}