
/**
 * Authentication Service
 * 
 * This is a placeholder for a real authentication service.
 * To implement actual authentication, we recommend using Lovable's Supabase integration
 * which provides a complete authentication system with email/password, social logins, and more.
 */

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Mock authentication functions (replace with real backend calls)
export const authService = {
  // Current auth state
  currentState: { ...initialState },
  
  // Get current authenticated user
  getCurrentUser: (): AuthState => {
    // In a real implementation, this would check local storage or cookies
    // and validate the token with the backend
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        authService.currentState = {
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        };
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    
    return authService.currentState;
  },
  
  // Login function
  login: async (email: string, password: string): Promise<AuthState> => {
    authService.currentState = {
      ...authService.currentState,
      loading: true,
      error: null,
    };
    
    try {
      // This would be an actual API call in a real implementation
      // const response = await api.post<{ user: User; token: string }>('/auth/login', { email, password });
      
      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: "user-123",
        email,
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      };
      
      const token = "mock-jwt-token";
      
      // Store auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      authService.currentState = {
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      };
      
      return authService.currentState;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Login failed";
      
      authService.currentState = {
        ...authService.currentState,
        loading: false,
        error: errorMsg,
      };
      
      return authService.currentState;
    }
  },
  
  // Signup function
  signup: async (name: string, email: string, password: string): Promise<AuthState> => {
    authService.currentState = {
      ...authService.currentState,
      loading: true,
      error: null,
    };
    
    try {
      // This would be an actual API call in a real implementation
      // const response = await api.post<{ user: User; token: string }>('/auth/signup', { name, email, password });
      
      // Mock successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
      };
      
      const token = "mock-jwt-token";
      
      // Store auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      authService.currentState = {
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      };
      
      return authService.currentState;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Signup failed";
      
      authService.currentState = {
        ...authService.currentState,
        loading: false,
        error: errorMsg,
      };
      
      return authService.currentState;
    }
  },
  
  // Logout function
  logout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    authService.currentState = {
      ...initialState,
    };
  },
};

// Initialize the auth state on load
authService.getCurrentUser();
