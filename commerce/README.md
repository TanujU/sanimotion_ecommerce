# SaniMotion Store

A modern e-commerce store built with Next.js, TypeScript, Tailwind CSS, and Supabase. This is a demo store similar to the [Vercel Store](https://demo.vercel.store/) but using mock data instead of requiring Shopify integration.

## Features

- 🛍️ **Product Catalog** - Browse products with beautiful grid layouts
- 🔍 **Search & Filter** - Find products quickly with search functionality
- 🛒 **Shopping Cart** - Add items to cart (demo functionality)
- 🔐 **Secure Authentication** - Complete user authentication with Supabase Auth
- 👤 **User Profiles** - User account management and profile system
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Next.js 15 and React Server Components
- 🎨 **Modern UI** - Clean, modern design with Tailwind CSS
- 🛡️ **Enterprise Security** - Comprehensive security features and best practices

## Products Included

The store includes demo products similar to the Vercel Store:
- SaniMotion Circles T-Shirt ($20.00)
- SaniMotion Drawstring Bag ($12.00)
- SaniMotion Cup ($15.00)
- SaniMotion Mug ($15.00)
- SaniMotion Hoodie ($50.00)
- SaniMotion Baby Onesie ($10.00)
- SaniMotion Baby Cap ($10.00)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account (for authentication)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the database setup script (see [Database Setup](#database-setup) below)

3. Configure environment variables:
   Create a `.env.local` file in the `commerce` directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the project to be fully initialized

2. **Run Database Setup Script**:
   - Open the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-setup.sql`
   - Execute the script to create all tables, policies, and functions

3. **Configure Authentication**:
   - Go to Authentication > Settings in your Supabase dashboard
   - Enable email authentication
   - Configure email templates for password reset and verification
   - Set up rate limiting and security policies

## Project Structure

```
commerce/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── login/             # Authentication pages
│   ├── signup/            # User registration
│   ├── search/            # Search and product listing
│   └── product/[handle]/  # Individual product pages
├── components/            # React components
│   ├── auth-nav.tsx       # Authentication navigation
│   ├── session-warning.tsx # Session timeout warnings
│   ├── grid/             # Product grid components
│   ├── layout/           # Layout components (navbar, footer)
│   ├── product/          # Product-specific components
│   └── cart/             # Shopping cart components
├── lib/                  # Utility functions and data
│   ├── auth-context.tsx  # Authentication context
│   ├── session-manager.ts # Session management
│   ├── supabase.ts       # Supabase client configuration
│   ├── security/         # Security utilities and validation
│   ├── mock-data.ts      # Mock product data
│   └── shopify/          # Mock Shopify API functions
├── supabase-setup.sql    # Database setup script
└── public/               # Static assets
```

## Customization

### Adding Products

To add new products, edit `lib/mock-data.ts` and add new items to the `mockProducts` array:

```typescript
{
  id: '8',
  title: 'Your Product Name',
  handle: 'your-product-handle',
  description: 'Product description...',
  price: {
    amount: '25.00',
    currencyCode: 'USD'
  },
  images: [
    {
      id: '8',
      url: 'https://images.unsplash.com/your-image.jpg',
      altText: 'Your Product'
    }
  ],
  variants: [
    {
      id: '8',
      title: 'Default Title',
      price: {
        amount: '25.00',
        currencyCode: 'USD'
      }
    }
  ],
  tags: ['category1', 'category2']
}
```

### Styling

The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying Tailwind classes in components
- Adding custom CSS in `app/globals.css`
- Updating the color scheme in `tailwind.config.js`

### Real Shopify Integration

To connect to a real Shopify store:

1. Set up environment variables:
```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token
SHOPIFY_REVALIDATION_SECRET=your_secret
SITE_NAME="Your Store Name"
```

2. Replace the mock functions in `lib/shopify/index.ts` with real Shopify API calls

## Deployment

This project can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Authentication & Security

This application uses **Supabase Auth** for authentication, which provides enterprise-grade security features:

### Why Supabase Auth (Not NextAuth.js)?

**Supabase Auth is the recommended choice** for this project because:

✅ **Already Integrated** - Seamlessly works with the existing database  
✅ **Comprehensive Security** - Built-in rate limiting, password validation, and session management  
✅ **Database Integration** - Direct integration with user profiles and audit logs  
✅ **Production Ready** - Enterprise-grade security features out of the box  
✅ **No Additional Dependencies** - Reduces complexity and potential conflicts  

**NextAuth.js would add unnecessary complexity:**
❌ Additional authentication layer  
❌ Potential conflicts with Supabase  
❌ More dependencies to maintain  
❌ Duplicate functionality  

### Security Features Implemented

- 🔐 **Secure Authentication** - PKCE flow, rate limiting, password validation
- 🛡️ **Session Management** - Automatic timeout, refresh, and device tracking
- 📊 **Audit Logging** - Complete audit trail of all user actions
- 🔒 **Row Level Security** - Database-level access control
- 🚫 **Rate Limiting** - Protection against brute force attacks
- 🔑 **Password Security** - Strong password requirements and validation
- 📧 **Email Verification** - Secure email-based account verification
- 🔄 **Password Reset** - Secure password reset flow

### Authentication Flow

1. **User Registration** - Email verification required
2. **Secure Login** - Rate-limited with account lockout protection
3. **Session Management** - 30-minute idle timeout, 8-hour max duration
4. **Password Reset** - Secure email-based reset flow
5. **Profile Management** - User can update profile information

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service with authentication and database
- **React Server Components** - Server-side rendering
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons

## License

This project is open source and available under the [MIT License](LICENSE).

## Security Documentation

For detailed security configuration and setup instructions, see:
- [SECURITY_CONFIGURATION.md](./SECURITY_CONFIGURATION.md) - Comprehensive security setup guide
- [AUTH_ISSUES_FIX_GUIDE.md](./AUTH_ISSUES_FIX_GUIDE.md) - Authentication troubleshooting
- [AUTO_LOGOUT_GUIDE.md](./AUTO_LOGOUT_GUIDE.md) - Session management guide

## Credits

This project is based on the [Next.js Commerce](https://github.com/vercel/commerce) template by Vercel, enhanced with:
- **Supabase Authentication** - Enterprise-grade security
- **Comprehensive Security Features** - Rate limiting, audit logging, session management
- **Database Integration** - User profiles, sessions, and audit trails
- **Production-Ready Security** - Following Supabase Auth best practices
