export const CATEGORY_CONFIG = {
  VALIDATION: {
    NAME_MIN_LENGTH: 1,
    SLUG_MIN_LENGTH: 1,
  },
  REVALIDATION_PATHS: {
    ADMIN_LIST: '/admin/categories',
    PUBLIC_PRODUCTS: '/products',
    getAdminDetail: (id: number | string) => `/admin/categories/${id}`,
  },
} as const;
