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
import {getDoctor} from "@/lib/actions/doctor.actions";

const Success = async ({ searchParams, params }: SearchParamProps) => {
	const appointment: Appointment = await getAppointment(
		searchParams.appointmentId as string
	)

	if (!appointment) return redirect(`/patient/${params.id}/new-appointment`)

	const {doctor} = await getDoctor(appointment.primaryPhysician.$id)
	const user = await getUser(params.id)

	Sentry.metrics.set('user_view_appointment_success', user.name)

	return (
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
					Your <span className='text-green-500'>appointment request</span> has
					been successfully submitted!
				</p>
				<p className='text-dark-700'>
					We&apos;ll be in touch shortly to confirm.
				</p>
			</div>
			<div className='border-y border-dark-500 py-8 flex flex-col gap-4 md:flex-row justify-center items-center'>
				<p className='text-lg text-dark-700'>Requested appointment details:</p>
				{
					doctor ?
						<div className='flex items-center gap-2'>
							<Image
								src={doctor.avatar}
								width={50}
								height={50}
								alt={doctor.name}
								className='size-6 rounded-full'
							/>
							<p>Dr. {doctor.name}</p>
						</div> : null
				}
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
				<Link href={`/patient/${params.id}/new-appointment`}>
					New Appointment
				</Link>
			</Button>
		</section>
	)
}

export default Success