import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { AuthUser } from "@/types/auth";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
} from "@/lib/auth";

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        email: string,
        password: string,
    ) => AuthUser;
    logout: () => void;
}

const AuthContext =
    createContext<AuthContextValue | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        setUser(getCurrentUser());
        setIsLoading(false);
    }, []);

    const login = (
        email: string,
        password: string,
    ) => {
        const loggedInUser = loginUser(
            email,
            password,
        );

        setUser(loggedInUser);

        return loggedInUser;
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider",
        );
    }

    return context;
}