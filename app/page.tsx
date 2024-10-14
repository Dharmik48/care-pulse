import PasskeyModal from '@/components/PasskeyModal'
import RegistrationForm from '@/components/RegistrationForm'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
	const isDoctor = searchParams.doctor === 'true'

	return (
		<main className='flex max-h-screen h-screen'>
			<div className='container my-auto h-[90%]'>
				{/* {isAdmin && <PasskeyModal />} */}
				<section className='sub-container max-w-[496px] justify-between h-full'>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={500}
						width={500}
						className='mb-12 h-10 w-max'
						alt='Care pulse logo'
					/>
					<RegistrationForm isDoctor={isDoctor} />
					<div className='mt-4'>
						Have an account already?{' '}
						{isDoctor ? (
							<Link
								href={'/login?doctor=true'}
								className='text-primary underline'
							>
								Login
							</Link>
						) : (
							<Link href={'/login'} className='text-primary underline'>
								Login
							</Link>
						)}
					</div>
					<div className='flex justify-between text-14-regular items-center mt-8'>
						<p className='copyright'>
							&copy;carepulse {new Date().getFullYear()}
						</p>
						{isDoctor ? (
							<Link href={'/'} className='text-green-500'>
								Not a doctor?
							</Link>
						) : (
							<Link href={'/?doctor=true'} className='text-green-500'>
								Are you a doctor?
							</Link>
						)}
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
