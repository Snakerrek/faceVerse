export type UserData = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string | null;
    gender?: string | null;
    avatar_url: string | null;
    cover_url: string | null;
}

export type LoginResponse = {
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

export type Res<T> = {
    status: ResponseStatus,
    message?: string
    data?: T
}

export enum ResponseStatus {
    OK,
    ERROR
}

export enum Gender {
    FEMALE = 'Woman',
    MALE = 'Man',
};

export interface Post {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
  author_name: string;
  author_avatar_url: string | null;
  image_url: string | null;
}

export interface CreatePostData {
  content: string;
  localImageUri?: string | null;
}