const ADMIN_EMAILS = new Set([
    "absamaard@gmail.com",
    "bashmufol@gmail.com",
    "busaridwan@gmail.com",
]);

export type UserRole = "admin" | "user";

export function getUserRole(
    email: string | null | undefined,
): UserRole {
    if (!email) {
        return "user";
    }

    return ADMIN_EMAILS.has(email.toLowerCase())
        ? "admin"
        : "user";
}

export function isAdmin(
    email: string | null | undefined,
) {
    return getUserRole(email) === "admin";
}