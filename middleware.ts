import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const secret = process.env.TVOS_SECRET_KEY
  const token = request.headers.get('x-tv-app-key')

  if (!token || token !== secret) {
    return new NextResponse('Forbidden: Invalid TV App Key', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      Protect all routes except static assets, Next.js internals, or optionally public APIs
    */
    '/((?!_next/static|_next/image|favicon.ico|api/public).*)',
  ],
}
