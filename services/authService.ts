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
      // Vérification des identifiants prédéfinis
      if (email === 'client@gmail.com' && password === '12345678') {
        const user: User = {
          id: 1,
          nom: 'Client',
          prenom: 'Alice',
          email: 'client@gmail.com',
          tel: '',
          role: 'client'
        };
        const response: LoginResponse = {
          user,
          token: 'client-token'
        };
        this.currentUser = user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', response.token);
        return response;
      } else if (email === 'coiffeuse@gmail.com' && password === '12345678') {
        const user: User = {
          id: 2,
          nom: 'Coiffeuse',
          prenom: 'Salon',
          email: 'coiffeuse@gmail.com',
          tel: '',
          role: 'coiffeuse'
        };
        const response: LoginResponse = {
          user,
          token: 'coiffeuse-token'
        };
        this.currentUser = user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', response.token);
        return response;
      }

      throw new Error('Identifiants invalides');
    } catch (error) {
      throw new Error('Échec de la connexion');
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      this.currentUser = null;
    } catch (error) {
      throw new Error('Échec de la déconnexion');
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

  isCoiffeuse(): boolean {
    return this.currentUser?.role === 'coiffeuse';
  }

  isClient(): boolean {
    return this.currentUser?.role === 'client';
  }
}

export const authService = AuthService.getInstance();
