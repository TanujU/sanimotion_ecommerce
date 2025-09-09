# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your Sanimotion e-commerce application with support for registered users, guest users, and promo codes.

## Prerequisites

- Supabase project created with name "sanimotion_ecommerce"
- Node.js and npm installed
- Access to your Supabase dashboard

## Step 1: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
SITE_NAME=Sanimotion
```

### How to get these values:

1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql` into the editor
4. Click "Run" to execute the script

This will create:
- `users` table with support for both registered and guest users
- `sessions` table for session management
- `promo_codes` table for promotional codes
- Proper indexes and Row Level Security (RLS) policies
- Sample promo codes (WELCOME50, FIRST10, MEDICAL20)

## Step 3: Authentication Configuration

### Enable Email Authentication

1. Go to Authentication → Settings in your Supabase dashboard
2. Under "Auth Providers", ensure "Email" is enabled
3. Configure email templates if needed

### Optional: Configure Email Templates

1. Go to Authentication → Email Templates
2. Customize the confirmation and reset password emails
3. Update the redirect URLs to match your domain

## Step 4: Test the Integration

### Start the Development Server

```bash
npm run dev
```

### Test User Registration

1. Navigate to `/signup`
2. Fill out the registration form
3. Check your email for confirmation (if email confirmation is enabled)
4. Verify the user appears in the `users` table in Supabase

### Test User Login

1. Navigate to `/login`
2. Use the credentials from registration
3. Verify successful login and redirect

### Test Guest User

1. Click the "GUEST" button in the navigation
2. Verify a guest user is created in the database
3. Check that the user state updates in the UI

## Step 5: Database Schema Overview

### Users Table
```sql
- id: UUID (Primary Key)
- email: TEXT (Unique)
- name: TEXT
- phone_number: TEXT
- is_guest: BOOLEAN (Default: false)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Sessions Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to users.id)
- token: TEXT (Unique)
- expires_at: TIMESTAMP
- created_at: TIMESTAMP
```

### Promo Codes Table
```sql
- id: UUID (Primary Key)
- code: TEXT (Unique)
- issued_to: UUID (Foreign Key to users.id, nullable)
- initial_amount: NUMERIC(10,2)
- remaining_amount: NUMERIC(10,2)
- issued_at: TIMESTAMP
- created_at: TIMESTAMP
```

## Step 6: Features Implemented

### ✅ Authentication Features
- User registration with email/password
- User login with email/password
- Guest user creation
- User profile management
- Session management
- Secure logout

### ✅ UI Components
- Dynamic navigation showing user state
- Login/Signup forms with validation
- User dropdown menu
- Guest user option
- Responsive design for mobile and desktop

### ✅ Database Features
- Row Level Security (RLS) policies
- Automatic timestamp updates
- Session cleanup functions
- Promo code management
- Guest user support

## Step 7: Customization Options

### Adding New User Fields

To add new fields to the user profile:

1. Update the `users` table schema in Supabase
2. Update the `User` interface in `lib/supabase.ts`
3. Update the signup form in `app/signup/page.tsx`
4. Update the `signUp` function in `lib/auth-context.tsx`

### Customizing Promo Codes

The system includes sample promo codes. To add more:

```sql
INSERT INTO public.promo_codes (code, initial_amount, remaining_amount) VALUES
('YOUR_CODE', 25.00, 25.00);
```

### Session Management

Sessions are automatically managed by Supabase Auth. The `sessions` table is available for custom session tracking if needed.

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the project root
   - Restart the development server after adding variables

2. **Database Connection Issues**
   - Verify your Supabase URL and keys are correct
   - Check that the database tables were created successfully

3. **Authentication Not Working**
   - Ensure email authentication is enabled in Supabase
   - Check the browser console for error messages
   - Verify RLS policies are correctly set up

4. **Guest User Creation Failing**
   - Check that the `create_guest_user()` function was created
   - Verify the function has proper permissions

### Debug Mode

To enable debug logging, add this to your environment variables:

```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Security Considerations

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Guest users are properly isolated
- Session tokens are securely managed
- All database operations are validated

## Next Steps

1. **Email Verification**: Configure email confirmation for new users
2. **Password Reset**: Implement forgot password functionality
3. **Profile Management**: Add user profile editing capabilities
4. **Admin Panel**: Create admin interface for managing users and promo codes
5. **Analytics**: Add user activity tracking
6. **Social Login**: Integrate Google/Facebook authentication

## Support

If you encounter any issues:

1. Check the Supabase dashboard logs
2. Review the browser console for errors
3. Verify all environment variables are set correctly
4. Ensure the database schema matches the expected structure

The authentication system is now fully integrated and ready for production use!
