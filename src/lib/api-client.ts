export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    // Try to get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error('Network error occurred');
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Students
  async getStudents(params?: { page?: number; limit?: number; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return this.request(`/students${query ? `?${query}` : ''}`);
  }

  async createStudent(studentData: any) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id: string, studentData: any) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id: string) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Faculty
  async getFaculty(params?: { page?: number; limit?: number; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return this.request(`/faculty${query ? `?${query}` : ''}`);
  }

  async createFaculty(facultyData: any) {
    return this.request('/faculty', {
      method: 'POST',
      body: JSON.stringify(facultyData),
    });
  }

  async updateFaculty(id: string, facultyData: any) {
    return this.request(`/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(facultyData),
    });
  }

  async deleteFaculty(id: string) {
    return this.request(`/faculty/${id}`, {
      method: 'DELETE',
    });
  }

  // Activities
  async getActivities(params?: { 
    page?: number; 
    limit?: number; 
    studentId?: string; 
    status?: string; 
    category?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.studentId) queryParams.append('studentId', params.studentId);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    
    const query = queryParams.toString();
    return this.request(`/activities${query ? `?${query}` : ''}`);
  }

  async createActivity(activityData: any) {
    return this.request('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  }

  async updateActivity(id: string, activityData: any) {
    return this.request(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activityData),
    });
  }

  async deleteActivity(id: string) {
    return this.request(`/activities/${id}`, {
      method: 'DELETE',
    });
  }

  // Placements
  async getPlacements(params?: { page?: number; limit?: number; status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return this.request(`/placements${query ? `?${query}` : ''}`);
  }

  async createPlacement(placementData: any) {
    return this.request('/placements', {
      method: 'POST',
      body: JSON.stringify(placementData),
    });
  }

  async updatePlacement(id: string, placementData: any) {
    return this.request(`/placements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(placementData),
    });
  }

  async deletePlacement(id: string) {
    return this.request(`/placements/${id}`, {
      method: 'DELETE',
    });
  }

  // Portfolio methods
  async getPortfolio(studentId?: string) {
    const url = studentId ? `/portfolio?studentId=${studentId}` : '/portfolio';
    return this.request(url);
  }

  async updatePortfolio(portfolioData: any, studentId?: string) {
    const data = studentId ? { ...portfolioData, studentId } : portfolioData;
    return this.request('/portfolio', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;