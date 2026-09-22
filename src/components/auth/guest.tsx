import { Navigate, Outlet } from "react-router-dom";

import { getCurrentUser } from "@/lib/auth";
import { routes } from "@/routes/routes";

export function RequireGuest() {
    const user = getCurrentUser();

    if (user) {
        return <Navigate to={routes.dashboard} replace />;
    }

    return <Outlet />;
}