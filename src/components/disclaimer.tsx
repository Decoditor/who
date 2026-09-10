import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DISCLAIMER_KEY = "who-ng-disclaimer-accepted";

export default function Disclaimer() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem(DISCLAIMER_KEY);

        if (!accepted) {
            setOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(DISCLAIMER_KEY, "true");
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md border-[#123B35]/10 bg-[#F4F0E8] text-[#123B35]">
                <AlertDialogHeader>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#123B35] text-sm font-black text-white">
                        W
                    </div>

                    <AlertDialogTitle className="text-2xl font-black tracking-[-0.04em]">
                        Before you continue
                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-4 pt-2 text-sm leading-6 text-[#123B35]/65">
                        <span className="block">
                            Who.ng is an independent, privately-run platform for Nigerians
                            to share who they support and why.
                        </span>

                        <span className="block">
                            Who.ng is not affiliated with, endorsed by, or connected to INEC.
                            An endorsement on Who.ng is not an official vote and does not
                            affect election results.
                        </span>

                        <span className="block text-xs text-[#123B35]/50">
                            By continuing, you acknowledge that you understand what
                            Who.ng is - and what it is not.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogAction
                        onClick={handleAccept}
                        className="w-full rounded-full bg-[#123B35] text-white hover:bg-[#123B35]/90"
                    >
                        I understand
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}