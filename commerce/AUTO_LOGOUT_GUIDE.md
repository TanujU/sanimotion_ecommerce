# Auto Logout System Implementation Guide

## Overview
This system implements industry-standard automatic logout functionality that removes manual logout options and manages user sessions automatically based on inactivity and security policies.

## Industry Standards Implemented

### 1. **Session Timeout Policies**
- **Idle Timeout**: 30 minutes of inactivity
- **Maximum Session Duration**: 8 hours
- **Warning Period**: 5 minutes before auto-logout
- **Session Validation**: Every 5 minutes

### 2. **Security Features**
- Automatic session cleanup
- Database session tracking
- Idle time detection
- Page visibility monitoring
- Session extension on user activity

## Components Created

### 1. **Session Manager** (`lib/session-manager.ts`)
- Tracks user activity (mouse, keyboard, scroll, touch)
- Monitors page visibility changes
- Manages session timeouts and warnings
- Handles automatic logout
- Provides session information

### 2. **Session Warning Modal** (`components/session-warning.tsx`)
- Shows countdown timer before logout
- Allows users to extend session
- Provides option to logout immediately
- Displays security information

### 3. **Updated Auth Context** (`lib/auth-context.tsx`)
- Removed manual `signOut` function
- Integrated with session manager
- Added `getSessionInfo` function
- Automatic session cleanup on logout

### 4. **Updated Auth Navigation** (`components/auth-nav.tsx`)
- Removed manual logout button
- Added session information display
- Shows idle time and session duration
- Displays auto-logout countdown

### 5. **Database Functions** (`auto-logout-setup.sql`)
- Session cleanup functions
- Session statistics
- Force logout capabilities
- Session extension functions
- Automatic cleanup triggers

## Setup Instructions

### 1. **Run Database Setup**
Execute the SQL script in your Supabase SQL editor:
```sql
-- Copy and paste the contents of auto-logout-setup.sql
```

### 2. **Session Manager Configuration**
The session manager is automatically initialized when users log in. Key configuration:

```typescript
export const SESSION_CONFIG = {
  IDLE_TIMEOUT: 30 * 60 * 1000,        // 30 minutes
  MAX_SESSION_DURATION: 8 * 60 * 60 * 1000, // 8 hours
  WARNING_TIME: 5 * 60 * 1000,         // 5 minutes warning
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
};
```

### 3. **Automatic Cleanup**
Set up a cron job or Supabase Edge Function to periodically clean expired sessions:

```sql
-- Call this function every hour
SELECT cleanup_expired_sessions();
```

## How It Works

### 1. **User Activity Tracking**
- Monitors mouse movements, clicks, keyboard input, scrolling, and touch events
- Resets idle timer on any user activity
- Pauses monitoring when page is hidden

### 2. **Session Lifecycle**
1. **Login**: Session manager initializes, starts monitoring
2. **Activity**: Timer resets on user interaction
3. **Warning**: 5-minute warning before logout
4. **Logout**: Automatic logout after 30 minutes of inactivity
5. **Cleanup**: Session removed from database

### 3. **Session Validation**
- Checks session validity every 5 minutes
- Updates session in database
- Handles expired tokens gracefully
- Cleans up invalid sessions

### 4. **User Experience**
- **Transparent**: Users see session info in dropdown
- **Warning**: Clear countdown before logout
- **Control**: Option to extend session
- **Security**: Automatic cleanup on page close

## Security Benefits

### 1. **Prevents Session Hijacking**
- Automatic timeout reduces exposure window
- Database session tracking
- Token validation

### 2. **Compliance**
- Meets industry security standards
- Configurable timeout periods
- Audit trail through session tracking

### 3. **Resource Management**
- Automatic cleanup of expired sessions
- Prevents database bloat
- Efficient memory usage

## Customization Options

### 1. **Timeout Configuration**
Modify `SESSION_CONFIG` in `session-manager.ts`:

```typescript
export const SESSION_CONFIG = {
  IDLE_TIMEOUT: 15 * 60 * 1000,        // 15 minutes (shorter)
  MAX_SESSION_DURATION: 4 * 60 * 60 * 1000, // 4 hours (shorter)
  WARNING_TIME: 2 * 60 * 1000,         // 2 minutes warning
  SESSION_CHECK_INTERVAL: 2 * 60 * 1000, // 2 minutes
};
```

### 2. **Activity Events**
Add or remove activity tracking events:

```typescript
const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'focus'];
```

### 3. **Warning Customization**
Modify the warning modal appearance and behavior in `session-warning.tsx`.

## Monitoring and Maintenance

### 1. **Session Statistics**
Query session statistics:

```sql
SELECT * FROM get_session_stats();
```

### 2. **Active Sessions**
View active sessions:

```sql
SELECT * FROM active_sessions_view;
```

### 3. **Force Logout**
Force logout a specific user:

```sql
SELECT force_logout_user('user-uuid-here');
```

### 4. **Extend Session**
Extend a user's session:

```sql
SELECT extend_user_session('user-uuid-here', 60); -- 60 minutes
```

## Testing

### 1. **Idle Timeout Test**
1. Log in to the application
2. Stop all user activity
3. Wait for warning (25 minutes)
4. Verify countdown timer
5. Test session extension
6. Verify auto-logout (30 minutes)

### 2. **Activity Reset Test**
1. Log in and wait for warning
2. Move mouse or type
3. Verify timer resets
4. Confirm warning disappears

### 3. **Page Visibility Test**
1. Log in and minimize browser
2. Wait 30+ minutes
3. Return to page
4. Verify immediate logout

## Troubleshooting

### 1. **Sessions Not Cleaning Up**
- Check if cleanup function is running
- Verify database permissions
- Check for errors in Supabase logs

### 2. **Warning Not Showing**
- Check browser console for errors
- Verify session manager initialization
- Check component mounting

### 3. **Auto-logout Not Working**
- Verify event listeners are attached
- Check session manager state
- Review auth context integration

## Files Modified

1. **`lib/session-manager.ts`** - Core session management logic
2. **`components/session-warning.tsx`** - Warning modal component
3. **`lib/auth-context.tsx`** - Removed manual logout, added session integration
4. **`components/auth-nav.tsx`** - Removed logout button, added session info
5. **`app/layout.tsx`** - Added session warning modal
6. **`auto-logout-setup.sql`** - Database functions and cleanup

## Benefits

✅ **Security**: Industry-standard session management  
✅ **Compliance**: Meets security requirements  
✅ **User Experience**: Clear warnings and controls  
✅ **Automation**: No manual logout needed  
✅ **Monitoring**: Full session tracking and statistics  
✅ **Maintenance**: Automatic cleanup and management  

The system now provides enterprise-grade session management with automatic logout based on industry standards!
