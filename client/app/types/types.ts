export type UserData = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
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

export type RegisterData = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
}

export enum ResponseStatus {
    OK,
    ERROR
}

export type Res = {
    status: ResponseStatus,
    message?: string
}