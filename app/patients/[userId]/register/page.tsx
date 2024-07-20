import PatientForm from '@/components/PatientForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId)

	return (
		<main className='flex max-h-screen h-screen'>
			<div className='container remove-scrollbar'>
				<section className='sub-container max-w-3xl py-10 h-full'>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={500}
						width={500}
						className='mb-12 h-10 w-max'
						alt='Care pulse logo'
					/>
					<PatientForm user={user} />
					<p className='copyright py-8'>
						&copy;carepulse {new Date().getFullYear()}
					</p>
				</section>
			</div>
			<Image
				src={'/assets/images/register-img.png'}
				width={1000}
				height={1000}
				className='side-img max-w-[30%] rounded-l-xl'
				alt='register welcome'
			/>
		</main>
	)
}

export default Register
