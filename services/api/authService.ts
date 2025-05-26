// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
};

export const authService = {
  getCurrentUser: async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockUser);
      }, 1000);
    });
  },

  login: async (email: string, password: string) => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockUser);
      }, 1000);
    });
  },

  signUp: async (userData: any) => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({...mockUser, ...userData});
      }, 1000);
    });
  },
};
