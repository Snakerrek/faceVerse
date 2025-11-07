export type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  gender?: string | null;
  avatar_url: string | null;
  cover_url: string | null;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  user: UserData;
  error?: string;
};

export type LoginData = {
  password: string;
  email: string;
};

export type RegisterFormData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  gender: Gender;
};

export type RegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: Gender;
};

export type Res<T> = {
  status: ResponseStatus;
  message?: string;
  data?: T;
};

export enum ResponseStatus {
  OK,
  ERROR,
}

export enum Gender {
  FEMALE = "Woman",
  MALE = "Man",
}

export interface Post {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
  author_name: string;
  author_avatar_url: string | null;
  image_url: string | null;
  like_count: number;
  is_liked_by_current_user: boolean;
  comment_count: number;
}

export interface CreatePostData {
  content: string;
  localImageUri?: string | null;
}

export interface LikeResponse {
  message: string;
  liked: boolean;
  like_count: number;
}

export interface Comment {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
  post_id: number;
  author_name: string;
  author_avatar_url: string | null;
  like_count: number;
  is_liked_by_current_user: boolean;
}

export interface CreateCommentResponse {
  message: string;
  comment: Comment;
}

export interface Notification {
  id: number;
  type:
    | "friend_request"
    | "friend_request_accepted"
    | "new_post"
    | "new_comment"
    | "post_liked"
    | "comment_liked";
  actor: {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
  post_id: number | null;
  comment_id: number | null;
  is_read: boolean;
  created_at: string;
}

export interface UnreadCountResponse {
  unread_count: number;
}

export interface FriendshipStatus {
  status: "none" | "pending_sent" | "pending_received" | "friends";
}

export interface Friend {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
}
