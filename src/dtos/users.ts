export interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
    surname: string;
    photo_address?: string;
    phone?: string;
    role: number;
    active: boolean;
}

export interface ResultUserDTO {
    id: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    photo_address?: string;
    phone?: string;
    role: number;
    active: boolean;
}
