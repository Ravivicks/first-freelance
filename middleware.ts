import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./navigation";

// Initialize the next-intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

// Custom middleware that runs Clerk and next-intl middleware
export default function middleware(req: NextRequest) {
  // Run Clerk middleware first
  // Otherwise, run the next-intl middleware
  const intlResponse = intlMiddleware(req);

  // If Clerk middleware returns a response, return it
  if (intlResponse) {
    return intlResponse;
  }
  const clerkResponse = clerkMiddleware();

  // Return the next-intl response or continue to the next middleware
  return intlResponse || NextResponse.next();
}

// Configure matcher to apply to the necessary paths
export const config = {
  matcher: [
    // Apply Clerk middleware to API routes and non-static paths
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    // Apply next-intl middleware to localized routes
    "/",
    "/(en|es)/:path*",
  ],
};
