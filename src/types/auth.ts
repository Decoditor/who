export type UserRole = "admin" | "user";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface StoredUser extends AuthUser {
    password: string;
    verified: boolean;
}

export interface AuthSession {
    user: AuthUser;
}