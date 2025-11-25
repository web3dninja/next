export const AUTH_CONFIG = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 2,
  TOKEN_EXPIRY: '7d',
  COOKIE_NAME: 'auth-token',
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
} as const;
