export type UserRole = "user" | "admin";

export interface CurrentUser {
    name: string;
    email: string;
    role: UserRole;
}