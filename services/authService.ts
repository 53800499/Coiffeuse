import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  role: 'client' | 'coiffeuse';
}

export interface LoginResponse {
  user: User;
  token: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://your-api-url/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data: LoginResponse = await response.json();
      this.currentUser = data.user;
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      this.currentUser = null;
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        this.currentUser = JSON.parse(userStr);
        return this.currentUser;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = AuthService.getInstance();
