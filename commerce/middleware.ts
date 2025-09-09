import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Create Supabase client for middleware
    const supabase = createMiddlewareClient({ req, res })
    
    // Get session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    // Add security headers
    res.headers.set('X-Content-Type-Options', 'nosniff')
    res.headers.set('X-Frame-Options', 'DENY')
    res.headers.set('X-XSS-Protection', '1; mode=block')
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // Add HSTS header for HTTPS
    if (req.nextUrl.protocol === 'https:') {
      res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
    
    // Rate limiting headers
    res.headers.set('X-RateLimit-Limit', '100')
    res.headers.set('X-RateLimit-Remaining', '99')
    
    // Handle protected routes
    const protectedRoutes = ['/profile', '/checkout', '/admin']
    const isProtectedRoute = protectedRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )
    
    if (isProtectedRoute) {
      if (!session) {
        // Redirect to login with return URL
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
      
      // Check if session is expired
      if (session.expires_at && new Date(session.expires_at) <= new Date()) {
        // Session expired, redirect to login
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        loginUrl.searchParams.set('expired', 'true')
        return NextResponse.redirect(loginUrl)
      }
    }
    
    // Handle auth routes (login, signup) - redirect if already authenticated
    const authRoutes = ['/login', '/signup']
    const isAuthRoute = authRoutes.some(route => 
      req.nextUrl.pathname.startsWith(route)
    )
    
    if (isAuthRoute && session) {
      // User is already authenticated, redirect to home
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    // Handle auth callback and password reset routes
    if (req.nextUrl.pathname.startsWith('/auth/callback') || 
        req.nextUrl.pathname.startsWith('/forgot-password')) {
      // Allow access to auth callback and forgot password pages
      return res
    }
    
    // Log security events for monitoring
    if (process.env.NODE_ENV === 'production') {
      // Log suspicious activity
      const userAgent = req.headers.get('user-agent') || ''
      const suspiciousPatterns = [
        /bot/i,
        /crawler/i,
        /spider/i,
        /scraper/i,
        /curl/i,
        /wget/i,
      ]
      
      if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
        console.log('Suspicious user agent detected:', {
          userAgent,
          path: req.nextUrl.pathname,
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          timestamp: new Date().toISOString(),
        })
      }
    }
    
    return res
    
  } catch (error) {
    console.error('Middleware error:', error)
    
    // Return error response for critical failures
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
    
    // For non-API routes, continue with basic response
    return res
  }
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}