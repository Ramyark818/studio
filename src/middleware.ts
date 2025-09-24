import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define protected routes and their required roles
const routePermissions = {
  // Admin-only routes
  '/dashboard/admin': ['admin'],
  '/api/students': ['admin'],
  '/api/faculty': ['admin'],
  '/api/activities': ['admin'],
  '/api/classes': ['admin'],
  '/api/placements': ['admin'],
  '/api/users': ['admin'],
  
  // Faculty routes (accessible by admin and faculty)
  '/dashboard/faculty': ['admin', 'faculty'],
  '/api/faculty/profile': ['admin', 'faculty'],
  '/api/classes/faculty': ['admin', 'faculty'],
  
  // Student routes (accessible by admin and student)
  '/dashboard/student': ['admin', 'student'],
  '/api/students/profile': ['admin', 'student'],
  '/api/portfolio': ['admin', 'student'],
  
  // Public routes (no authentication required)
  '/': null,
  '/login': null,
  '/api/auth/login': null,
} as const;

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/api/auth/login',
  '/_next',
  '/favicon.ico',
  '/static',
];

// Check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname.startsWith(route));
}

// Get required roles for a route
function getRequiredRoles(pathname: string): string[] | null {
  // Check exact matches first
  if (pathname in routePermissions) {
    return routePermissions[pathname as keyof typeof routePermissions];
  }
  
  // Check if it starts with any protected route pattern
  for (const [route, roles] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route) && roles) {
      return roles;
    }
  }
  
  return null; // No specific permissions required
}

// Verify JWT token and extract user info
function verifyToken(token: string): { userId: string; email: string; role: string } | null {
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Get auth token from cookies or Authorization header
  const tokenFromCookie = request.cookies.get('authToken')?.value;
  const authHeader = request.headers.get('authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  const token = tokenFromCookie || tokenFromHeader;
  
  // Check if authentication is required
  const requiredRoles = getRequiredRoles(pathname);
  
  // If no token is provided for protected routes
  if (!token && requiredRoles !== null) {
    // For API routes, return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Authentication required', 
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }
    
    // For dashboard routes, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If no specific roles required, allow access
  if (requiredRoles === null) {
    return NextResponse.next();
  }
  
  // Verify token
  const user = verifyToken(token!);
  
  if (!user) {
    // Invalid token
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid or expired token', 
          code: 'INVALID_TOKEN' 
        },
        { status: 401 }
      );
    }
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Check role permissions
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Access denied. Required roles: ${requiredRoles.join(', ')}`, 
          code: 'FORBIDDEN' 
        },
        { status: 403 }
      );
    }
    
    // Redirect to appropriate dashboard based on user role
    const dashboardUrl = new URL(`/dashboard/${user.role}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Add user info to request headers for API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('x-user-id', user.userId);
    response.headers.set('x-user-email', user.email);
    response.headers.set('x-user-role', user.role);
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};