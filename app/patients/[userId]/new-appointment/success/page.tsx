import { Button } from '@/components/ui/button'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import { Appointment } from '@/types/appwrite.types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/patient.actions'

const Success = async ({ searchParams, params }: SearchParamProps) => {
	const appointment: Appointment = await getAppointment(
		searchParams.appointmentId as string
	)

	if (!appointment)
		return redirect(`/patients/${params.userId}/new-appointment`)

	const doctor = Doctors.find(doc => doc.name === appointment.primaryPhysician)
	const user = await getUser(params.userId)

	Sentry.metrics.set('user_view_appointment_success', user.name)

	return (
		<main className='flex max-h-screen h-screen px-4'>
			<div className='success-img'>
				<Link href={'/'}>
					<Image
						src={'/assets/icons/logo-full.svg'}
						height={200}
						width={200}
						alt='care pulse logo'
						className='mx-auto mb-20'
					/>
				</Link>
				<section className='space-y-16'>
					<div className='text-center space-y-6'>
						<Image
							src={'/assets/gifs/success.gif'}
							alt='checkmark'
							height={200}
							width={200}
							className='mx-auto'
						/>
						<p className='header'>
							Your <span className='text-green-500'>appointment request</span>{' '}
							has been successfully submitted!
						</p>
						<p className='text-dark-700'>
							We&apos;ll be in touch shortly to confirm.
						</p>
					</div>
					<div className='border-y border-dark-500 py-8 flex flex-col gap-4 md:flex-row justify-center items-center'>
						<p className='text-lg text-dark-700'>
							Requested appointment details:
						</p>
						<div className='flex items-center gap-2'>
							<Image
								src={doctor?.image!}
								width={50}
								height={50}
								alt={appointment.primaryPhysician}
								className='size-6'
							/>
							<p>Dr. {appointment.primaryPhysician}</p>
						</div>
						<div className='flex items-center gap-2'>
							<Image
								src={'/assets/icons/calendar.svg'}
								width={24}
								height={24}
								alt='calendar icon'
							/>
							{formatDateTime(appointment.schedule).dateTime}
						</div>
					</div>
					<Button className='shad-primary-btn mx-auto block'>
						<Link href={`/patients/${params.userId}/new-appointment`}>
							New Appointment
						</Link>
					</Button>
				</section>
			</div>
		</main>
	)
}

export default Success
