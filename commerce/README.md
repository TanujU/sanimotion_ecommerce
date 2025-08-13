# SaniMotion Store

A modern e-commerce store built with Next.js, TypeScript, and Tailwind CSS. This is a demo store similar to the [Vercel Store](https://demo.vercel.store/) but using mock data instead of requiring Shopify integration.

## Features

- 🛍️ **Product Catalog** - Browse products with beautiful grid layouts
- 🔍 **Search & Filter** - Find products quickly with search functionality
- 🛒 **Shopping Cart** - Add items to cart (demo functionality)
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Next.js 15 and React Server Components
- 🎨 **Modern UI** - Clean, modern design with Tailwind CSS

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

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
commerce/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── search/            # Search and product listing
│   └── product/[handle]/  # Individual product pages
├── components/            # React components
│   ├── grid/             # Product grid components
│   ├── layout/           # Layout components (navbar, footer)
│   ├── product/          # Product-specific components
│   └── cart/             # Shopping cart components
├── lib/                  # Utility functions and data
│   ├── mock-data.ts      # Mock product data
│   └── shopify/          # Mock Shopify API functions
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

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Server Components** - Server-side rendering
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

This project is based on the [Next.js Commerce](https://github.com/vercel/commerce) template by Vercel, modified to use mock data instead of requiring Shopify integration.
