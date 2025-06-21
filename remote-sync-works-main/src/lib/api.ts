const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  register: async (name: string, email: string, password: string, businessName: string) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, businessName }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Sales API
export const salesAPI = {
  getAll: async () => {
    return await apiRequest('/sales');
  },

  create: async (product: string, quantity: number, price: number) => {
    return await apiRequest('/sales', {
      method: 'POST',
      body: JSON.stringify({ product, quantity, price }),
    });
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async () => {
    return await apiRequest('/analytics/dashboard');
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async () => {
    return await apiRequest('/tasks');
  },

  create: async (task: {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    points: number;
  }) => {
    return await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// File Upload API
export const uploadAPI = {
  uploadStatement: async (file: File) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload/statement`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  },
};

// Health check API
export const healthAPI = {
  check: async () => {
    return await apiRequest('/health');
  },
}; 