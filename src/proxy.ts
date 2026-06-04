import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const isLoggedIn = !!user;
  const { pathname } = request.nextUrl;

  // Define our protected dashboard boundaries
  const isSecureRoute = 
    pathname.startsWith("/products/checkout") || 
    pathname.startsWith("/chat") || 
    pathname.startsWith("/admin");

  // If trying to access a secure dashboard and aren't logged in, redirect to login
  if (isSecureRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  return supabaseResponse;
}

// Tells Next.js exactly which paths to trigger the proxy gatekeeper on
export const config = {
  matcher: ["/products/checkout/:path*", "/chat/:path*", "/admin/:path*"],
};