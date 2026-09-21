import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface LocationOption {
    id: string;
    name: string;
}

interface LocationSelectProps {
    label: string;
    placeholder: string;
    value?: string;
    options: LocationOption[];
    onValueChange: (value: string | null) => void;
    disabled?: boolean;
}

export default function LocationSelect({
    label,
    placeholder,
    value,
    options,
    onValueChange,
    disabled = false,
}: LocationSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold">
                {label}
            </label>

            <Select
                value={value || null}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.id}
                            value={option.id}
                        >
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}