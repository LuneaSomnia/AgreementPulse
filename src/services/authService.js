import axios from 'axios';
import jwt_decode from 'jwt-decode';

class AuthService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_AUTH_API_URL;
    this.tokenKey = 'auth_token';
  }

  async login(credentials) {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, credentials);
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem(this.tokenKey, token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const decoded = jwt_decode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getAuthHeaders() {
    const token = localStorage.getItem(this.tokenKey);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getCurrentUser() {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    
    try {
      const decoded = jwt_decode(token);
      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };
    } catch {
      return null;
    }
  }
}

export default new AuthService();
