
/**
 * API Client utility
 * 
 * This is a placeholder for backend API integration.
 * To implement actual backend functionality, we recommend using Lovable's Supabase integration
 * which provides authentication, database, storage, and serverless functions.
 */

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Base URL would typically come from environment variables
const API_BASE_URL = "https://api.yourservice.com"; // Replace with your actual API URL

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // In a real implementation, you would get this token from your auth system
    const authToken = localStorage.getItem("authToken");
    
    const headers = {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    return {
      data: response.ok ? data : undefined,
      error: response.ok ? undefined : data.message || "An error occurred",
      status: response.status,
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      error: error instanceof Error ? error.message : "Network request failed",
      status: 500,
    };
  }
}

/**
 * CRUD API methods
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchWithAuth<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, data: unknown, options?: RequestInit) =>
    fetchWithAuth<T>(endpoint, { 
      method: "POST", 
      body: JSON.stringify(data),
      ...options 
    }),

  put: <T>(endpoint: string, data: unknown, options?: RequestInit) =>
    fetchWithAuth<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options
    }),

  patch: <T>(endpoint: string, data: unknown, options?: RequestInit) =>
    fetchWithAuth<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchWithAuth<T>(endpoint, { method: "DELETE", ...options }),
};

/**
 * Example usage:
 * 
 * // Get data
 * const { data, error } = await api.get<User[]>('/users');
 * 
 * // Create data
 * const { data, error } = await api.post<User>('/users', { name: 'John', email: 'john@example.com' });
 * 
 * // Update data
 * const { data, error } = await api.put<User>('/users/123', { name: 'John Updated' });
 * 
 * // Delete data
 * const { data, error } = await api.delete<void>('/users/123');
 */
