import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import {
  revalidateTag,
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife
} from 'next/cache';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

// Use mock data instead of real Shopify API
import {
  mockProducts,
  mockCollections,
  getMockCart,
  addItemToMockCart,
  removeItemFromMockCart,
  updateItemQuantityInMockCart
} from '../mock-data';

const domain = 'https://mock-store.myshopify.com';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = 'mock_token';

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  // Return mock cart instead of calling Shopify API
  return getMockCart() as unknown as Cart;
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  // Add items to mock cart
  for (const line of lines) {
    addItemToMockCart(line.merchandiseId, line.quantity);
  }
  return getMockCart() as unknown as Cart;
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  // Remove items from mock cart
  for (const lineId of lineIds) {
    removeItemFromMockCart(lineId);
  }
  return getMockCart() as unknown as Cart;
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  // Update items in mock cart
  for (const line of lines) {
    updateItemQuantityInMockCart(line.id, line.quantity);
  }
  return getMockCart() as unknown as Cart;
}

export async function getCart(): Promise<Cart | undefined> {
  // Return current mock cart instead of calling Shopify API
  return getMockCart() as unknown as Cart;
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  // Return mock collection instead of calling Shopify API
  const mockCollection = mockCollections.find(collection => collection.handle === handle);
  if (!mockCollection) return undefined;

  return {
    handle: mockCollection.handle,
    title: mockCollection.title,
    description: mockCollection.description,
    seo: {
      title: mockCollection.title,
      description: mockCollection.description
    },
    path: `/search/${mockCollection.handle}`,
    updatedAt: new Date().toISOString()
  } as Collection;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // Return mock collection products instead of calling Shopify API
  const mockCollection = mockCollections.find(col => col.handle === collection);
  if (!mockCollection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return mockCollection.products.map(product => ({
    id: product.id,
    handle: product.handle,
    availableForSale: true,
    title: product.title,
    description: product.description,
    descriptionHtml: product.description,
    options: [],
    priceRange: {
      maxVariantPrice: product.price,
      minVariantPrice: product.price
    },
    variants: product.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      availableForSale: true,
      selectedOptions: [],
      price: variant.price
    })),
    featuredImage: product.images[0] ? {
      ...product.images[0],
      width: 800,
      height: 800
    } : null,
    images: product.images.map(img => ({
      ...img,
      width: 800,
      height: 800
    })),
    seo: {
      title: product.title,
      description: product.description
    },
    tags: product.tags,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  })) as unknown as Product[];
}

export async function getCollections(): Promise<Collection[]> {
  // Return mock collections instead of calling Shopify API
  return mockCollections.map(collection => ({
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    seo: {
      title: collection.title,
      description: collection.description
    },
    path: `/search/${collection.handle}`,
    updatedAt: new Date().toISOString()
  })) as Collection[];
}

export async function getMenu(handle: string): Promise<Menu[]> {
  // Return mock menu instead of calling Shopify API
  return [
    {
      title: 'All',
      path: '/search'
    },
    {
      title: 'Mediziner',
      path: '/search/mediziner'
    }
  ];
}

export async function getFooterMenu(): Promise<Menu[]> {
  // Return footer menu items
  return [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Terms & Conditions',
      path: '/terms'
    },
    {
      title: 'Shipping & Return Policy',
      path: '/shipping'
    },
    {
      title: 'Privacy Policy',
      path: '/privacy'
    },
    {
      title: 'FAQ',
      path: '/faq'
    }
  ];
}

export async function getPage(handle: string): Promise<Page> {
  // Return mock page instead of calling Shopify API
  return {
    id: 'mock-page',
    title: 'Mock Page',
    handle: handle,
    body: 'This is a mock page.',
    bodySummary: 'Mock page summary.',
    seo: {
      title: 'Mock Page',
      description: 'Mock page description'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as Page;
}

export async function getPages(): Promise<Page[]> {
  // Return mock pages instead of calling Shopify API
  return [
    {
      id: 'mock-page-1',
      title: 'About Us',
      handle: 'about',
      body: 'This is the about page.',
      bodySummary: 'About page summary.',
      seo: {
        title: 'About Us',
        description: 'About page description'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ] as Page[];
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  // Return mock product instead of calling Shopify API
  const mockProduct = mockProducts.find(product => product.handle === handle);
  if (!mockProduct) return undefined;

  return {
    id: mockProduct.id,
    handle: mockProduct.handle,
    availableForSale: true,
    title: mockProduct.title,
    description: mockProduct.description,
    descriptionHtml: mockProduct.description,
    options: [],
    priceRange: {
      maxVariantPrice: mockProduct.price,
      minVariantPrice: mockProduct.price
    },
    variants: mockProduct.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      availableForSale: true,
      selectedOptions: [],
      price: variant.price
    })),
    featuredImage: mockProduct.images[0] ? {
      ...mockProduct.images[0],
      width: 800,
      height: 800
    } : null,
    images: mockProduct.images.map(img => ({
      ...img,
      width: 800,
      height: 800
    })),
    seo: {
      title: mockProduct.title,
      description: mockProduct.description
    },
    tags: mockProduct.tags,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  } as unknown as Product;
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  // Return mock product recommendations instead of calling Shopify API
  return mockProducts.slice(0, 3).map(product => ({
    id: product.id,
    handle: product.handle,
    availableForSale: true,
    title: product.title,
    description: product.description,
    descriptionHtml: product.description,
    options: [],
    priceRange: {
      maxVariantPrice: product.price,
      minVariantPrice: product.price
    },
    variants: product.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      availableForSale: true,
      selectedOptions: [],
      price: variant.price
    })),
    featuredImage: product.images[0] ? {
      ...product.images[0],
      width: 800,
      height: 800
    } : null,
    images: product.images.map(img => ({
      ...img,
      width: 800,
      height: 800
    })),
    seo: {
      title: product.title,
      description: product.description
    },
    tags: product.tags,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  })) as unknown as Product[];
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // Return mock products instead of calling Shopify API
  return mockProducts.map(product => ({
    id: product.id,
    handle: product.handle,
    availableForSale: true,
    title: product.title,
    description: product.description,
    descriptionHtml: product.description,
    options: [],
    priceRange: {
      maxVariantPrice: product.price,
      minVariantPrice: product.price
    },
    variants: product.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      availableForSale: true,
      selectedOptions: [],
      price: variant.price
    })),
    featuredImage: product.images[0] ? {
      ...product.images[0],
      width: 800,
      height: 800
    } : null,
    images: product.images.map(img => ({
      ...img,
      width: 800,
      height: 800
    })),
    seo: {
      title: product.title,
      description: product.description
    },
    tags: product.tags,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  })) as unknown as Product[];
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    'collections/create',
    'collections/delete',
    'collections/update'
  ];
  const productWebhooks = [
    'products/create',
    'products/delete',
    'products/update'
  ];
  const topic = (await headers()).get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
