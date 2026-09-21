import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { MemeField } from "@/types/memes";

interface MemeFieldEditorProps {
    field: MemeField;
    value: string | number | boolean | undefined;
    onChange: (
        value: string | number | boolean,
    ) => void;
    onImageChange?: (file: File | undefined) => void;
}

export function MemeFieldEditor({
    field,
    value,
    onChange,
    onImageChange
}: MemeFieldEditorProps) {
    if (field.type === "image") {
        return (
            <Field>
                <FieldLabel htmlFor={field.id}>
                    {field.label}
                </FieldLabel>

                <Input
                    id={field.id}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        onImageChange?.(
                            event.target.files?.[0],
                        );
                    }}
                />

                <FieldDescription>
                    Use a clear photo where your face is visible.
                </FieldDescription>
            </Field>
        );
    }

    if (field.type === "toggle") {
        return (
            <Field orientation="horizontal">
                <FieldLabel htmlFor={field.id}>
                    {field.label}
                </FieldLabel>

                <Switch
                    id={field.id}
                    checked={Boolean(value)}
                    onCheckedChange={onChange}
                />
            </Field>
        );
    }

    if (field.type === "select") {
        return (
            <Field>
                <FieldLabel htmlFor={field.id}>
                    {field.label}
                </FieldLabel>

                <Select
                    items={field.options ?? []}
                    value={String(value ?? "")}
                    onValueChange={(nextValue) => {
                        if (nextValue !== null) {
                            onChange(nextValue);
                        }
                    }}
                >
                    <SelectTrigger id={field.id}>
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>

                    <SelectContent>
                        {field.options?.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        );
    }

    return (
        <Field>
            <FieldLabel htmlFor={field.id}>
                {field.label}
            </FieldLabel>

            <Input
                id={field.id}
                type={
                    field.type === "number"
                        ? "number"
                        : "text"
                }
                value={String(value ?? "")}
                placeholder={field.placeholder}
                onChange={(event) => {
                    onChange(
                        field.type === "number"
                            ? Number(event.target.value)
                            : event.target.value,
                    );
                }}
            />
        </Field>
    );
}