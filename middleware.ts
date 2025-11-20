import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware - виконується перед кожним запитом
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Приклад: Логування запитів
  console.log(`[Middleware] ${request.method} ${pathname}`);

  // Приклад: Редирект зі старого URL на новий
  if (pathname === "/old-page") {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  // Приклад: Захист роутів (перевірка авторизації)
  if (pathname.startsWith("/dashboard")) {
    // В реальному проекті тут буде перевірка токена
    const isAuthenticated = request.cookies.get("auth-token");

    // Закоментовано для демо - розкоментуйте для тестування
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  // Приклад: Додавання кастомних заголовків
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "my-value");

  return response;
}

// Налаштування для яких шляхів запускати middleware
export const config = {
  matcher: [
    // Виключаємо статичні файли та API
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
