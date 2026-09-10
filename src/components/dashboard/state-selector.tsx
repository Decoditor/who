import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

interface StateSelectorProps {
    value: string;
    onChange: (state: string) => void;
}

const states = [
    "Oyo",
    "Lagos",
    "Kwara",
    "Osun",
    "Ogun",
    "Kaduna",
    "Kano",
    "Rivers",
    "Abuja",
];

export function StateSelector({
    value,
    onChange,
}: StateSelectorProps) {
    return (
        <Select
            value={value}
            onValueChange={(event) => onChange(event ?? "")}

        >
            <SelectTrigger>Select State</SelectTrigger>
            <SelectContent>
                {
                    states.map(state => (
                        <SelectItem>{state}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    );
}