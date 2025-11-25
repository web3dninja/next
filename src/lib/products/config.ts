export const PRODUCT_CONFIG = {
  VALIDATION: {
    NAME_MIN_LENGTH: 1,
    BRAND_MIN_LENGTH: 1,
    DESCRIPTION_MIN_LENGTH: 1,
    PRICE_MIN_LENGTH: 1,
    MIN_REDDIT_KEYWORDS: 1,
  },
  REVALIDATION_PATHS: {
    ADMIN_LIST: '/admin/products',
    PUBLIC_LIST: '/products',
    getAdminDetail: (id: number | string) => `/admin/products/${id}`,
    getPublicDetail: (id: number | string) => `/products/${id}`,
  },
} as const;
