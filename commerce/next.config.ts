export default {
  experimental: {
    ppr: true,
    useCache: true
  },
  env: {
    SITE_NAME: 'VITALORA',
    COMPANY_NAME: 'VITALORA'
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**'
      }
    ]
  }
};
