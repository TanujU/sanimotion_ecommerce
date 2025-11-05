import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Client-side Supabase client (for browser use only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: typeof window !== 'undefined',
    persistSession: typeof window !== 'undefined',
    detectSessionInUrl: typeof window !== 'undefined',
    flowType: 'pkce',
    storageKey: 'sanimotion-auth-token',
    debug: process.env.NODE_ENV === 'development',
  },
  global: {
    headers: {
      'X-Client-Info': 'sanimotion-ecommerce',
      'X-Client-Version': '1.0.0',
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  },
  db: {
    schema: 'public'
  }
})

// Server-side Supabase client (for server components and API routes)
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'sanimotion-ecommerce-server',
      'X-Client-Version': '1.0.0',
    }
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
