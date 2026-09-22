import type {
    AuthSession,
    AuthUser,
    StoredUser,
} from "@/types/auth";

const USERS_KEY = "who-ng-users";
const SESSION_KEY = "who-ng-session";

export const ADMIN_EMAILS = [
    "absamaard@gmail.com",
    "bashmufol@gmail.com",
    "busaridwan@gmail.com",
];

function getStoredUsers(): StoredUser[] {
    try {
        const stored = localStorage.getItem(USERS_KEY);

        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function isAdminEmail(email: string) {
    return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function createUser({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}): AuthUser {
    const normalizedEmail = email.trim().toLowerCase();

    const users = getStoredUsers();

    if (
        users.some(
            (user) =>
                user.email.toLowerCase() === normalizedEmail,
        )
    ) {
        throw new Error(
            "An account with this email already exists.",
        );
    }

    const user: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: isAdminEmail(normalizedEmail)
            ? "admin"
            : "user",
        verified: false,
    };

    saveUsers([...users, user]);

    return toAuthUser(user);
}

export function verifyUser(email: string): AuthUser {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    const user = users.find(
        (item) => item.email === normalizedEmail,
    );

    if (!user) {
        throw new Error("Account not found.");
    }

    const verifiedUser = {
        ...user,
        verified: true,
    };

    saveUsers(
        users.map((item) =>
            item.id === user.id ? verifiedUser : item,
        ),
    );

    const authUser = toAuthUser(verifiedUser);

    const session: AuthSession = {
        user: authUser,
    };

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session),
    );

    return authUser;
}

export function loginUser(
    email: string,
    password: string,
): AuthUser {
    const normalizedEmail = email.trim().toLowerCase();

    const user = getStoredUsers().find(
        (item) =>
            item.email === normalizedEmail &&
            item.password === password,
    );

    if (!user) {
        throw new Error(
            "Invalid email or password.",
        );
    }

    if (!user.verified) {
        throw new Error(
            "Please verify your email before signing in.",
        );
    }

    const session: AuthSession = {
        user: toAuthUser(user),
    };

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session),
    );

    return session.user;
}

export function getCurrentUser(): AuthUser | null {
    try {
        const stored = localStorage.getItem(
            SESSION_KEY,
        );

        if (!stored) {
            return null;
        }

        const session: AuthSession =
            JSON.parse(stored);

        return session.user ?? null;
    } catch {
        return null;
    }
}

export function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
}

export function getUserByEmail(
    email: string,
): StoredUser | undefined {
    return getStoredUsers().find(
        (user) =>
            user.email === email.trim().toLowerCase(),
    );
}

function toAuthUser(user: StoredUser): AuthUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}