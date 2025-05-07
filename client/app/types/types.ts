export type UserData = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string | null; // Expecting ISO string format (YYYY-MM-DD) from backend
    gender?: string | null;
}

export type LoginResponse = { // Interface for the expected login response
    message: string;
    access_token: string;
    user: UserData;
    error?: string;
}

export type LoginData = {
    password: string,
    email: string
}

export type RegisterFormData = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    dob_day: string,
    dob_month: string,
    dob_year: string,
    gender: Gender
}

export type RegisterData = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender: Gender
}

export enum ResponseStatus {
    OK,
    ERROR
}

export enum Gender {
    FEMALE = 'Kobieta',
    MALE = 'Mężczyzna',
};

export type Res = {
    status: ResponseStatus,
    message?: string
}