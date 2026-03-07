
export interface TenantCreateInputProps {
    name: string
    email: string,
    firstname: string;
    lastname: string;
    phone_number: string;
    password: string;
}

export interface TenantUpdateInputProps {
    name: string
    email?: string,
    phone_number?: string;
}

export interface TenantFormatProps {
    tenantId: string;
    displayName: string;
}

export interface TenantCreateUpdateResponseProps {
    status: boolean;
    message: string;
    data?: {
        id: string;
        name: string;
    };
}