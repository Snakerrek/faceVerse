import { API_BASE_URL } from "./config";
import { LoginResponse, UserData, LoginData, ResponseStatus, Res, RegisterData, CreatePostData, Post } from "./types/types";
import { saveAuthToken, getAuthToken } from "./utils/authUtils";
import { storeUserData } from "./utils/storageUtils";

export async function login(data: LoginData): Promise<Res<null>> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result: LoginResponse = await response.json();
    
        if (response.ok && result.access_token) {
            await saveAuthToken(result.access_token)
            console.log('Access token stored securely!');
    
            const userData: UserData = result.user;
            await storeUserData(userData);
            console.log('Login successful');
            return {status: ResponseStatus.OK};
        } else {
            return {status: ResponseStatus.ERROR, message: result.error || `Login failed (Status: ${response.status})`};
        }
    } catch (error) {
        console.error('Login Error:', error);
        return {status: ResponseStatus.ERROR, message: 'An error occurred during login. Please try again.'};
    }
}

export async function register(data: RegisterData): Promise<Res<null>> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
  
        if (response.ok) {
          return {status: ResponseStatus.OK};
        } else {
          return {status: ResponseStatus.ERROR, message: result.error || `Registration failed (Status: ${response.status})`};
        }
    } catch (error) {
        console.error('Registration Error:', error);
        return {status: ResponseStatus.ERROR, message: 'An error occurred during registration. Please try again.'};
    }
}

export async function createPost(data: CreatePostData): Promise<Res<Post[]>> {
    try {
        const token = await getAuthToken();
        if (!token) {
            return { status: ResponseStatus.ERROR, message: 'No authentication token found.' };
        }

        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the JWT token for auth
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();

        if (response.ok) {
            console.log('Post created successfully');
            // We return the newly created post object inside the 'data' property
            // This assumes your Flask service returns the new post on success
            return { status: ResponseStatus.OK, data: result }; 
        } else {
            return { status: ResponseStatus.ERROR, message: result.error || `Failed to create post (Status: ${response.status})` };
        }
    } catch (error) {
        console.error('Create Post Error:', error);
        return { status: ResponseStatus.ERROR, message: 'An error occurred while creating the post.' };
    }
}

export async function getPosts(): Promise<Res<Post[]>> {
    try {
        const token = await getAuthToken();
        console.log("Attempting to fetch posts with token:", token);
        if (!token) {
            return { status: ResponseStatus.ERROR, message: 'No authentication token found.' };
        }

        const response = await fetch(`${API_BASE_URL}/posts/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Add the JWT token for auth
            },
        });
        
        const result = await response.json();

        if (response.ok) {
            // The result is expected to be an array of posts
            return { status: ResponseStatus.OK, data: result as Post[] };
        } else {
            return { status: ResponseStatus.ERROR, message: result.error || `Failed to fetch posts (Status: ${response.status})` };
        }
    } catch (error) {
        console.error('Get Posts Error:', error);
        return { status: ResponseStatus.ERROR, message: 'An error occurred while fetching posts.' };
    }
}