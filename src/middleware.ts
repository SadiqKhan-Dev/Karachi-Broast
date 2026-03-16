// Clerk Middleware for Fast Food Ordering Platform
// This file handles authentication and route protection

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Check if Clerk keys are properly configured
const isClerkConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // Check if key exists and is not a placeholder
  if (!publishableKey) return false
  if (publishableKey.includes('your-')) return false
  if (publishableKey === 'pk_test_your-clerk-publishable-key') return false
  
  // Valid Clerk keys start with pk_test_ or pk_live_
  return publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_')
}

const publicRoutes = createRouteMatcher([
  '/',
  '/menu(.*)',
  '/product(.*)',
  '/about',
  '/contact',
  '/api/uploadthing(.*)',
  '/api/webhooks/stripe',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/order-success(.*)',
])

const adminRoutes = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // If Clerk is not configured, allow all routes (development mode)
  if (!isClerkConfigured()) {
    return NextResponse.next()
  }

  const { userId, sessionClaims } = await auth()

  // Protect non-public routes
  if (!publicRoutes(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Protect admin routes - require admin role
  if (adminRoutes(req)) {
    const role = sessionClaims?.metadata?.role as string
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
