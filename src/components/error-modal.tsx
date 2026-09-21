import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";

interface ValidationErrorDialogProps {
    open: boolean;
    message: string;
    title: string;
    onClose: () => void;
}

export function ValidationErrorDialog({
    open,
    message,
    onClose,
    title,
}: ValidationErrorDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader className="flex! flex-col! text-center text-destructive items-center! justify-center">
                    <TriangleAlert className="size-12" />
                    <AlertDialogTitle className={"text-xl"}>
                        {title}
                    </AlertDialogTitle>
                </AlertDialogHeader>


                <AlertDialogDescription>
                    {message}
                </AlertDialogDescription>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose}>
                        Okay
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}