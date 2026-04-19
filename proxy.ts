import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'cookie'

const privateRoutes = ['/profile', '/notes']
const publicRoutes = ['/sign-in', '/sign-up']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const isPublicRoute = publicRoutes.some((r) => pathname.startsWith(r))
  const isPrivateRoute = privateRoutes.some((r) => pathname.startsWith(r))

  if (!accessToken) {
    if (refreshToken) {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
        { headers: { Cookie: request.headers.get('cookie') ?? '' } }
      )

      if (apiRes.ok) {
        const setCookie = apiRes.headers.get('set-cookie')
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next()

        if (setCookie) {
          const cookieArray = setCookie.split(/,(?=\s*\w+=)/)
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr)
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            }
            if (parsed.accessToken) {
              response.cookies.set('accessToken', parsed.accessToken, options)
            }
            if (parsed.refreshToken) {
              response.cookies.set('refreshToken', parsed.refreshToken, options)
            }
          }
        }
        return response
      }
    }

    if (isPublicRoute) return NextResponse.next()
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}