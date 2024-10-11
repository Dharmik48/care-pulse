import Image from 'next/image'
import Link from 'next/link'
import PatientLoginForm from './_components/PatientLoginForm'
import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { redirect } from 'next/navigation'

const Login = async () => {
	const { user } = await getLoggedInUser()

	if (user) return redirect(`/patients/${user.$id}/register`)

	return (
		<main className='flex max-h-screen h-screen'>
			<div className='container my-auto h-[90%]'>
				<section className='sub-container max-w-[496px] justify-between h-full'>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={500}
						width={500}
						className='mb-12 h-10 w-max'
						alt='Care pulse logo'
					/>
					<PatientLoginForm />
					<div className='mt-4'>
						Don&apos;t have an account?{' '}
						<Link href={'/'} className='text-primary underline'>
							Sign Up
						</Link>
					</div>
					<div className='flex justify-between text-14-regular items-center mt-8'>
						<p className='copyright'>
							&copy;carepulse {new Date().getFullYear()}
						</p>
						<Link href={'/?admin=true'} className='text-green-500'>
							Admin
						</Link>
					</div>
				</section>
			</div>
			<Image
				src={'/assets/images/onboarding-img.png'}
				width={1000}
				height={1000}
				className='side-img max-w-[50%] rounded-l-xl'
				alt='onboarding welcome'
			/>
		</main>
	)
}

export default Login
