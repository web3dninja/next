export const USER_CONFIG = {
  VALIDATION: {
    USERNAME_MIN_LENGTH: 2,
    PASSWORD_MIN_LENGTH: 6,
  },
  REVALIDATION_PATHS: {
    ADMIN_LIST: '/admin/users',
    PUBLIC_PROFILE: '/profile',
  },
} as const;
