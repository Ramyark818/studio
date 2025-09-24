import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface UserPayload {
  userId: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
}

/**
 * Verify JWT token and return user payload
 */
export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Extract user from request headers (set by middleware)
 */
export function getUserFromRequest(request: NextRequest): UserPayload | null {
  const userId = request.headers.get('x-user-id');
  const email = request.headers.get('x-user-email');
  const role = request.headers.get('x-user-role') as UserPayload['role'];
  
  if (userId && email && role) {
    return { userId, email, role };
  }
  
  return null;
}

/**
 * Extract user from auth token in request
 */
export function getUserFromToken(request: NextRequest): UserPayload | null {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

/**
 * Check if user has required role
 */
export function hasRole(user: UserPayload, requiredRoles: string[]): boolean {
  return requiredRoles.includes(user.role);
}

/**
 * Client-side authentication helper
 */
export class AuthClient {
  private token: string | null = null;
  
  constructor() {
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
  
  getToken(): string | null {
    return this.token;
  }
  
  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
  
  isAuthenticated(): boolean {
    return !!this.token;
  }
  
  getUser(): UserPayload | null {
    if (!this.token) return null;
    return verifyToken(this.token);
  }
  
  hasRole(requiredRoles: string[]): boolean {
    const user = this.getUser();
    if (!user) return false;
    return hasRole(user, requiredRoles);
  }
  
  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

// Export singleton instance
export const authClient = new AuthClient();