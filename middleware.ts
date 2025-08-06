import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Define protected routes
    const protectedRoutes = ['/candidates', '/recruiters']
    const authRoutes = ['/login', '/register']

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

    // For protected routes, let the client-side auth handle redirects
    // This is a simple approach that works with localStorage-based auth
    if (isProtectedRoute) {
        // Let the page load and handle auth check on client side
        return NextResponse.next()
    }

    // For auth routes, also let client side handle redirects
    if (isAuthRoute) {
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
