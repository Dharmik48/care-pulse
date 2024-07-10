import RegisterForm from '@/components/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId)

	return (
		<main className='flex max-h-screen h-screen'>
			<div className='container my-auto h-[90%] remove-scrollbar'>
				<section className='sub-container max-w-2xl justify-between h-full'>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={500}
						width={500}
						className='mb-12 h-10 w-max'
						alt='Care pulse logo'
					/>
					<RegisterForm user={user} />
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
				src={'/assets/images/register-img.png'}
				width={1000}
				height={1000}
				className='side-img max-w-[40%] rounded-l-xl'
				alt='register welcome'
			/>
		</main>
	)
}

export default Register
