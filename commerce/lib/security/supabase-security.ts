/**
 * Comprehensive Supabase Security Configuration
 * Following Supabase Auth best practices and security guidelines
 */

import { supabase } from '../supabase';

// Security configuration constants
export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SYMBOLS: true,
    FORBIDDEN_PATTERNS: [
      /password/i,
      /123456/i,
      /qwerty/i,
      /admin/i,
      /user/i,
      /test/i,
    ],
  },
  
  // Rate limiting
  RATE_LIMITS: {
    LOGIN_ATTEMPTS: 5,
    LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
    SIGNUP_ATTEMPTS: 3,
    SIGNUP_WINDOW: 60 * 60 * 1000, // 1 hour
    PASSWORD_RESET_ATTEMPTS: 3,
    PASSWORD_RESET_WINDOW: 60 * 60 * 1000, // 1 hour
  },
  
  // Session security
  SESSION: {
    IDLE_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_DURATION: 8 * 60 * 60 * 1000, // 8 hours
    WARNING_TIME: 5 * 60 * 1000, // 5 minutes before logout
    REFRESH_THRESHOLD: 5 * 60 * 1000, // Refresh 5 minutes before expiry
  },
  
  // JWT configuration
  JWT: {
    ALGORITHM: 'HS256',
    EXPIRY_TIME: 60 * 60, // 1 hour
    REFRESH_EXPIRY: 7 * 24 * 60 * 60, // 7 days
  },
  
  // Security headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
};

// Password validation utility
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < SECURITY_CONFIG.PASSWORD.MIN_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD.MIN_LENGTH} characters long`);
  }
  
  if (password.length > SECURITY_CONFIG.PASSWORD.MAX_LENGTH) {
    errors.push(`Password must be no more than ${SECURITY_CONFIG.PASSWORD.MAX_LENGTH} characters long`);
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for forbidden patterns
  for (const pattern of SECURITY_CONFIG.PASSWORD.FORBIDDEN_PATTERNS) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns and is not secure');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Email validation utility
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Rate limiting implementation
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);
    
    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    if (attempt.count >= this.maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  }
  
  getRemainingTime(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return 0;
    
    const now = Date.now();
    return Math.max(0, attempt.resetTime - now);
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Rate limiters for different operations
export const rateLimiters = {
  login: new RateLimiter(
    SECURITY_CONFIG.RATE_LIMITS.LOGIN_ATTEMPTS,
    SECURITY_CONFIG.RATE_LIMITS.LOGIN_WINDOW
  ),
  signup: new RateLimiter(
    SECURITY_CONFIG.RATE_LIMITS.SIGNUP_ATTEMPTS,
    SECURITY_CONFIG.RATE_LIMITS.SIGNUP_WINDOW
  ),
  passwordReset: new RateLimiter(
    SECURITY_CONFIG.RATE_LIMITS.PASSWORD_RESET_ATTEMPTS,
    SECURITY_CONFIG.RATE_LIMITS.PASSWORD_RESET_WINDOW
  ),
};

// Secure authentication functions
export class SupabaseAuthSecurity {
  /**
   * Secure sign up with comprehensive validation
   */
  static async secureSignUp(
    email: string,
    password: string,
    metadata: Record<string, any> = {},
    clientIP?: string
  ) {
    try {
      // Rate limiting check
      const identifier = clientIP || 'unknown';
      if (!rateLimiters.signup.isAllowed(identifier)) {
        const remainingTime = Math.ceil(rateLimiters.signup.getRemainingTime(identifier) / 60000);
        throw new Error(`Too many signup attempts. Please try again in ${remainingTime} minutes.`);
      }
      
      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors.join(', '));
      }
      
      // Sanitize metadata
      const sanitizedMetadata = this.sanitizeMetadata(metadata);
      
      // Attempt sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: sanitizedMetadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw error;
      }
      
      return {
        success: true,
        user: data.user,
        session: data.session,
        message: 'Account created successfully. Please check your email to verify your account.',
      };
      
    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Secure sign in with rate limiting and validation
   */
  static async secureSignIn(
    email: string,
    password: string,
    clientIP?: string
  ) {
    try {
      // Rate limiting check
      const identifier = clientIP || 'unknown';
      if (!rateLimiters.login.isAllowed(identifier)) {
        const remainingTime = Math.ceil(rateLimiters.login.getRemainingTime(identifier) / 60000);
        throw new Error(`Too many login attempts. Please try again in ${remainingTime} minutes.`);
      }
      
      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password (basic check)
      if (!password || password.length < 1) {
        throw new Error('Password is required');
      }
      
      // Attempt sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      // Reset rate limiter on successful login
      rateLimiters.login.reset(identifier);
      
      return {
        success: true,
        user: data.user,
        session: data.session,
        message: 'Login successful',
      };
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Secure password reset request
   */
  static async securePasswordReset(
    email: string,
    clientIP?: string
  ) {
    try {
      // Rate limiting check
      const identifier = clientIP || 'unknown';
      if (!rateLimiters.passwordReset.isAllowed(identifier)) {
        const remainingTime = Math.ceil(rateLimiters.passwordReset.getRemainingTime(identifier) / 60000);
        throw new Error(`Too many password reset attempts. Please try again in ${remainingTime} minutes.`);
      }
      
      // Validate email
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Request password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forgot-password`,
      });
      
      if (error) {
        throw error;
      }
      
      // Always return success to prevent email enumeration
      return {
        success: true,
        message: 'If an account with that email exists, we\'ve sent a password reset link.',
      };
      
    } catch (error: any) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Secure sign out
   */
  static async secureSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return {
        success: true,
        message: 'Signed out successfully',
      };
      
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Update user password with validation
   */
  static async updatePassword(
    newPassword: string,
    currentPassword?: string
  ) {
    try {
      // Validate new password
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors.join(', '));
      }
      
      // If current password is provided, verify it first
      if (currentPassword) {
        const { error: verifyError } = await supabase.auth.signInWithPassword({
          email: (await supabase.auth.getUser()).data.user?.email || '',
          password: currentPassword,
        });
        
        if (verifyError) {
          throw new Error('Current password is incorrect');
        }
      }
      
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        throw error;
      }
      
      return {
        success: true,
        message: 'Password updated successfully',
      };
      
    } catch (error: any) {
      console.error('Update password error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Get current session with validation
   */
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (!session) {
        return {
          success: false,
          session: null,
          message: 'No active session',
        };
      }
      
      // Check if session is expired
      if (session.expires_at && new Date(session.expires_at) <= new Date()) {
        return {
          success: false,
          session: null,
          message: 'Session has expired',
        };
      }
      
      return {
        success: true,
        session,
        message: 'Session is valid',
      };
      
    } catch (error: any) {
      console.error('Get session error:', error);
      return {
        success: false,
        session: null,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Refresh session token
   */
  static async refreshSession() {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }
      
      return {
        success: true,
        session,
        message: 'Session refreshed successfully',
      };
      
    } catch (error: any) {
      console.error('Refresh session error:', error);
      return {
        success: false,
        session: null,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
  
  /**
   * Sanitize user metadata
   */
  private static sanitizeMetadata(metadata: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(metadata)) {
      // Only allow string values and basic types
      if (typeof value === 'string' && value.length <= 1000) {
        // Remove potentially dangerous characters
        sanitized[key] = value.replace(/[<>\"'&]/g, '');
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// Export security utilities
export {
  RateLimiter,
};
