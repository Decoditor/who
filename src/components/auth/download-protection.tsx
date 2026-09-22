import { Download, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

interface SignInToDownloadProps {
    onDownload: () => void;
}

export function SignInToDownload({
    onDownload,
}: SignInToDownloadProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Button
                type="button"
                onClick={() => {
                    window.location.href = "/login";
                }}
            >
                <Lock />
                Sign in to download
            </Button>
        );
    }

    return (
        <Button
            type="button"
            onClick={onDownload}
        >
            <Download />
            Download
        </Button>
    );
}