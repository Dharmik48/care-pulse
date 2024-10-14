import type { NextRequest } from 'next/server'
import { getLoggedInUser } from './lib/actions/patient.actions'
import { Models } from 'node-appwrite'

export async function middleware(request: NextRequest) {
	const { user }: { user: Models.User<Models.Preferences> } =
		await getLoggedInUser()

	if (
		!user &&
		!request.nextUrl.pathname.startsWith('/login') &&
		request.nextUrl.pathname !== '/'
	) {
		return Response.redirect(new URL('/login', request.url))
	}

	if (
		user &&
		(request.nextUrl.pathname.startsWith('/login') ||
			request.nextUrl.pathname === '/')
	) {
		const url = user.labels.includes('doctor')
			? `/doctor/${user.$id}`
			: `/patient/${user.$id}`

		return Response.redirect(new URL(url, request.url))
	}
	// TODO add /doctor and /patient check
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.gif$).*)',
	],
}
