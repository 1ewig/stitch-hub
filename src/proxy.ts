import { auth } from "@/authentication/auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Define our protected dashboard boundaries
  const isSecureRoute = 
    pathname.startsWith("/checkout") || 
    pathname.startsWith("/chat") || 
    pathname.startsWith("/admin");

  // If trying to access a secure dashboard and aren't logged in, redirect to login
  if (isSecureRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }
});

// Tells Next.js exactly which paths to trigger the proxy gatekeeper on
export const config = {
  matcher: ["/checkout/:path*", "/chat/:path*", "/admin/:path*"],
};