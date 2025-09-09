# SSR (Server-Side Rendering) Fix Guide

## Problem
The `SessionManager` was trying to access browser APIs (`document`, `window`) during server-side rendering, causing the error:
```
ReferenceError: document is not defined
```

## Root Cause
Next.js renders components on the server first, where browser APIs like `document` and `window` are not available. The `SessionManager` was being instantiated during SSR and trying to set up event listeners immediately.

## Solution Applied

### 1. **Client-Side Only Initialization**
Modified `SessionManager` to only initialize on the client side:

```typescript
constructor() {
  // Only initialize on client side
  if (typeof window !== 'undefined') {
    this.initialize();
  }
}

private initialize() {
  if (this.isInitialized) return;
  
  this.setupEventListeners();
  this.startSessionMonitoring();
  this.isInitialized = true;
}
```

### 2. **Browser API Guards**
Added checks for browser APIs in all methods:

```typescript
private setupEventListeners() {
  // Only setup event listeners on client side
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // ... rest of the code
}

private handleVisibilityChange() {
  // Only handle visibility changes on client side
  if (typeof document === 'undefined') return;
  
  // ... rest of the code
}
```

### 3. **Lazy Initialization**
Added `ensureInitialized()` method to initialize when needed:

```typescript
public ensureInitialized() {
  // Ensure session manager is initialized on client side
  if (typeof window !== 'undefined' && !this.isInitialized) {
    this.initialize();
  }
}
```

### 4. **Component-Level SSR Handling**
Updated components to handle SSR properly:

**SessionWarningModal:**
```typescript
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  // ... rest of setup
}, []);

// Don't render on server side
if (!isClient || !warning?.showWarning) return null;
```

**AuthNav:**
```typescript
useEffect(() => {
  if (user && typeof window !== 'undefined') {
    // ... session info updates
  }
}, [user, getSessionInfo]);
```

### 5. **Auth Context Integration**
Updated auth context to properly initialize session manager:

```typescript
if (session?.user) {
  await fetchUserProfile(session.user.id);
  // Initialize session manager for authenticated user
  sessionManager.ensureInitialized();
  sessionManager.setOnLogoutCallback(() => {
    setUser(null);
    setSession(null);
    setLoading(false);
  });
}
```

## Files Modified

1. **`lib/session-manager.ts`** - Added SSR guards and lazy initialization
2. **`components/session-warning.tsx`** - Added client-side rendering check
3. **`lib/auth-context.tsx`** - Added proper session manager initialization
4. **`components/auth-nav.tsx`** - Added client-side checks for session updates

## How It Works Now

1. **Server-Side**: SessionManager is created but not initialized
2. **Client-Side**: When user logs in, `ensureInitialized()` is called
3. **Browser APIs**: Only accessed after client-side initialization
4. **Components**: Render safely on both server and client

## Testing

The application should now:
- ✅ Load without SSR errors
- ✅ Initialize session management on client-side
- ✅ Track user activity properly
- ✅ Show session warnings when needed
- ✅ Handle auto-logout correctly

## Key Principles

1. **Always check for browser APIs** before using them
2. **Use `typeof window !== 'undefined'`** to detect client-side
3. **Lazy initialize** browser-dependent code
4. **Handle hydration** properly in components
5. **Use `useEffect`** for client-side only operations

The auto-logout system now works correctly with Next.js SSR!
