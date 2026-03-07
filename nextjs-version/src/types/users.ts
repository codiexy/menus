
export interface LoginProps {
    value: string;
    password: string;
}

export interface CreateUserProps {
    firstname: string;
    lastname?: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    photoURL?: string;
}

export interface UpdateUserProps {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    displayName?: string;
    role?: string;
    username?: string;
    photoURL?: string;
    status?: "active" | "inactive";
}

export interface RandomUsernameProps {
    displayName?: string;
    name?: string;
    firstname?: string;
    lastname?: string;
}
