import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Enhanced Supabase client with comprehensive security configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic token refresh
    autoRefreshToken: true,
    // Persist session in localStorage (secure for web apps)
    persistSession: true,
    // Detect session from URL (for magic links, OAuth callbacks)
    detectSessionInUrl: true,
    // Use PKCE flow for enhanced security
    flowType: 'pkce',
    // Set secure storage key
    storageKey: 'sanimotion-auth-token',
    // Enable debug mode in development
    debug: process.env.NODE_ENV === 'development',
  },
  global: {
    headers: {
      'X-Client-Info': 'sanimotion-ecommerce',
      'X-Client-Version': '1.0.0',
    }
  },
  // Enable real-time subscriptions with security
  realtime: {
    params: {
      eventsPerSecond: 10, // Rate limit real-time events
    }
  },
  // Database configuration
  db: {
    schema: 'public'
  }
})

// Server-side client for secure operations (only available on server)
export const supabaseAdmin = (() => {
  // Only create admin client on server side
  if (typeof window !== 'undefined') {
    return null; // Return null on client side
  }
  
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not found - admin operations will not work')
    return null
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'sanimotion-ecommerce-admin',
        'X-Client-Version': '1.0.0',
      }
    }
  })
})()

// Database types based on your ERD
export interface UserProfile {
  id: string
  name: string
  phone_number: string
  bio?: string
  last_login_at?: string
  created_at: string
  updated_at: string
}

// Combined user type that includes auth data
export interface User {
  id: string
  email: string
  profile?: UserProfile
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: string
}

export interface PromoCode {
  id: string
  code: string
  issued_to: string | null
  initial_amount: number
  remaining_amount: number
  issued_at: string
}
