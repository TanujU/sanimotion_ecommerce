# User Profile Creation Fix Guide

## Problem
The error "Error creating user profile: {}" occurs during user signup because of a timing issue with Row Level Security (RLS) policies. When a user signs up, there's a brief moment where the user exists in `auth.users` but isn't fully authenticated yet, causing the RLS policy to reject the profile creation.

## Solution
I've implemented a two-part solution:

### 1. Database Trigger (Recommended)
The most reliable solution is to use a database trigger that automatically creates user profiles when users are created in the `auth.users` table.

**Steps to implement:**

1. Run the SQL script in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of create-profile-trigger.sql
   ```

2. The trigger will automatically create user profiles using the name and phone number from the user metadata.

### 2. Improved Client-Side Error Handling
I've also improved the client-side code to:
- Pass user data as metadata during signup
- Provide better error logging and user feedback
- Handle different types of errors gracefully

## Files Modified

### 1. `lib/auth-context.tsx`
- Added user metadata to signup request
- Improved error logging with detailed error information
- Simplified profile creation (now handled by trigger)

### 2. `app/signup/page.tsx`
- Enhanced error handling to show more specific error messages
- Better user feedback for different error scenarios

### 3. `create-profile-trigger.sql` (New file)
- Database trigger to automatically create user profiles
- Handles the timing issue by running at the database level

## How to Apply the Fix

1. **Run the database trigger script:**
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `create-profile-trigger.sql`
   - Execute the script

2. **The client-side changes are already applied** and will work with the trigger.

## Testing
After applying the fix:
1. Try creating a new user account
2. Check the browser console for success messages
3. Verify that the user profile is created in the `user_profiles` table

## Alternative Approach (If trigger doesn't work)
If you prefer not to use the database trigger, you can revert to the client-side approach by:
1. Removing the trigger from the database
2. Uncommenting the manual profile creation code in `auth-context.tsx`
3. The improved error handling will still help with debugging

## Benefits of This Solution
- **Reliable**: Database triggers run at the database level, avoiding timing issues
- **Automatic**: No need to manually create profiles in the client code
- **Secure**: Uses `SECURITY DEFINER` to ensure proper permissions
- **Maintainable**: Centralized profile creation logic in the database
