import Image from 'next/image'
import Link from 'next/link'
import {
	createSessionClient,
	getLoggedInUser,
} from '@/lib/actions/patient.actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function signOut() {
	'use server'

	const { account } = await createSessionClient()

	cookies().delete('my-custom-session')
	await account.deleteSession('current')

	redirect('/signup')
}

const Navbar = async () => {
	const { user } = await getLoggedInUser()

	const profileUrl = user?.labels.includes('doctor')
		? `/doctor/${user.$id}`
		: `/patient/${user?.$id}`

	return (
		<nav className='flex items-center justify-between flex-col md:flex-row gap-8'>
			<Image
				src={'/assets/icons/logo-full.svg'}
				height={500}
				width={500}
				className='h-10 w-max'
				alt='Care pulse logo'
			/>
			<ul className='flex items-center text-base text-foreground gap-4'>
				<li className='underline-offset-4 hover:underline'>
					<Link href={profileUrl}>Profile</Link>
				</li>
				<li className='underline-offset-4 hover:underline'>
					<Link href={`/guides`}>Guides</Link>
				</li>
				<li>
					<form action={signOut}>
						<button
							className='underline-offset-4 hover:underline'
							type='submit'
						>
							Sign Out
						</button>
					</form>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
