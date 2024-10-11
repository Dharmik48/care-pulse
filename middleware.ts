import type { NextRequest } from 'next/server'
import { getLoggedInUser } from './lib/actions/patient.actions'

export async function middleware(request: NextRequest) {
	const { user, error } = await getLoggedInUser()

	if (
		!user &&
		!request.nextUrl.pathname.startsWith('/login') &&
		request.nextUrl.pathname !== '/'
	) {
		return Response.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
