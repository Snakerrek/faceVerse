import { API_BASE_URL } from "./config";
import { LoginResponse, UserData, LoginData, ResponseStatus, Res, RegisterData } from "./types/types";
import { saveAuthToken } from "./utils/authUtils";
import { storeUserData } from "./utils/storageUtils";

export async function login(data: LoginData): Promise<Res> {
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

export async function register(data: RegisterData): Promise<Res> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/`, {
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