import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/home",
  "/dashboard",
  "/analytics",
  "/history",
  "/create",
  "/session",
];

interface CookieToSet {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  // If this route is public (e.g. /, /practice/*, /insights/*, /blog/*),
  // do not invoke remote Supabase auth network calls on edge/compute. Pass through immediately.
  if (!isProtected) {
    return response;
  }

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseUrl =
    rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
      ? rawUrl
      : undefined;
  const rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseAnonKey =
    rawKey && !rawKey.startsWith("[") && rawKey.length > 10
      ? rawKey
      : undefined;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isProtected) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() validates the auth token with Supabase and refreshes expired sessions
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/setup";
    redirectUrl.search = "";
    redirectUrl.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/home/:path*",
    "/dashboard/:path*",
    "/analytics/:path*",
    "/history/:path*",
    "/create/:path*",
    "/session/:path*",
    "/edit/:path*",
  ],
};
