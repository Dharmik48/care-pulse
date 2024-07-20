import AppointmentForm from '@/components/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions'
import Image from 'next/image'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
	const patient = await getPatient(userId)

	return (
		<main className='flex max-h-screen h-screen'>
			<div className='container my-auto h-[90%]'>
				<section className='sub-container max-w-xl justify-between h-full'>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={500}
						width={500}
						className='mb-12 h-10 w-max'
						alt='Care pulse logo'
					/>
					<AppointmentForm
						type='create'
						userId={userId}
						patientId={patient.$id}
						doctor={patient.primaryPhysician}
					/>
					<div className='flex justify-between text-14-regular items-center mt-8'>
						<p className='copyright'>
							&copy;carepulse {new Date().getFullYear()}
						</p>
					</div>
				</section>
			</div>
			<Image
				src={'/assets/images/appointment-img.png'}
				width={750}
				height={750}
				className='side-img max-w-[30%] rounded-l-xl'
				alt='decoration image'
			/>
		</main>
	)
}

export default NewAppointment
