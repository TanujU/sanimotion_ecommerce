import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware } from './lib/security/headers';

/**
 * Security middleware for Next.js
 * Applies security headers and basic protection
 */
export function middleware(request: NextRequest) {
  // Apply security headers
  const response = securityMiddleware(request);
  
  // Additional security checks
  const { pathname } = request.nextUrl;
  
  // Block access to sensitive files
  if (pathname.startsWith('/.env') || 
      pathname.startsWith('/package.json') ||
      pathname.startsWith('/package-lock.json') ||
      pathname.startsWith('/.git/')) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  // Rate limiting for authentication endpoints
  if (pathname.startsWith('/api/auth/') || 
      pathname === '/login' || 
      pathname === '/signup') {
    // In production, implement proper rate limiting here
    // For now, we'll rely on client-side rate limiting
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
