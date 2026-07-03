import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Requests arriving on admin.<domain> are rewritten to /admin/* internally,
// so the panel ships from this same project/deploy but lives on its own
// subdomain in production (configured as a custom domain in Vercel).
export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("admin.")) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
