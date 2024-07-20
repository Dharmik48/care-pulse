'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './ui/form'
import CustomFormField from './CustomFormField'
import SubmitBtn from './SubmitBtn'
import { useState } from 'react'
import { getAppointmentSchema } from '@/lib/validations'
import { getUser } from '@/lib/actions/patient.actions'
import { useRouter } from 'next/navigation'
import { Doctors, FormFieldTypes } from '@/constants'
import { SelectItem } from './ui/select'
import Image from 'next/image'
import { createAppointment } from '@/lib/actions/appointment.actions'

interface Props {
	type: 'cancel' | 'create' | 'schedule'
	userId: string
	patientId: string
	doctor?: string
}

const AppointmentForm = ({ type, patientId, userId, doctor }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const schema = getAppointmentSchema(type)

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			primaryPhysician: doctor || '',
			schedule: new Date(),
			reason: '',
			note: '',
			cancellationReason: '',
		},
	})

	let btnLabel

	switch (type) {
		case 'cancel':
			btnLabel = 'Cancel Appointment'
			break
		case 'create':
			btnLabel = 'Create Appointment'
			break
		case 'schedule':
			btnLabel = 'Scheule Appointment'
	}

	const onSubmit = async (values: z.infer<typeof schema>) => {
		setIsLoading(true)

		let status
		switch (type) {
			case 'schedule':
				status = 'scheduled'
				break
			case 'cancel':
				status = 'cancelled'
				break
			default:
				status = 'pending'
				break
		}

		try {
			if (type === 'create' && patientId) {
				const data = {
					userId,
					patient: patientId,
					primaryPhysician: values.primaryPhysician,
					schedule: new Date(values.schedule),
					note: values.note,
					reason: values.reason!,
					status: status as Status,
				}

				const appointment = await createAppointment(data)

				if (appointment)
					router.push(
						`/patients/${patientId}/new-appointment/success?appointmentId=${appointment.$id}`
					)
			}
		} catch (error) {
			console.log(error)
		}

		setIsLoading(false)
	}

	return (
		<section>
			<div className='mb-8'>
				<h3 className='text-4xl font-bold mb-4'>Hey there 👋</h3>
				<p className='text-dark-700'>Request a new appointment in 10 seconds</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					{type !== 'cancel' && (
						<>
							<CustomFormField
								control={form.control}
								name='primaryPhysician'
								placeholder='Select your primary physician'
								label='Doctor'
								fieldType={FormFieldTypes.SELECT}
								iconSrc='/assets/icons/stethoscope.svg'
							>
								{Doctors.map(doctor => (
									<SelectItem
										key={doctor.name}
										value={doctor.name}
										className='cursor-pointer hover:bg-dark-500'
									>
										<div className='flex gap-2 items-center'>
											<Image
												src={doctor.image}
												width={32}
												height={32}
												alt={`${doctor.name} picture`}
												className='rounded-full border border-dark-500'
											/>
											<p>{doctor.name}</p>
										</div>
									</SelectItem>
								))}
							</CustomFormField>
							<div className='flex flex-col lg:flex-row gap-6'>
								<CustomFormField
									control={form.control}
									name='reason'
									placeholder='ex: Annual monthly check-up'
									label='Reason for appointment '
									fieldType={FormFieldTypes.TEXTAREA}
								/>
								<CustomFormField
									control={form.control}
									name='notes'
									placeholder='ex: Prefer afternoon appointments, if possible'
									label='Additional comments/notes'
									fieldType={FormFieldTypes.TEXTAREA}
								/>
							</div>
							<CustomFormField
								control={form.control}
								name='schedule'
								placeholder='Select your appointment date'
								label='Expected appointment date'
								fieldType={FormFieldTypes.DATE}
								iconSrc='/assets/icons/calendar.svg'
								showTimeSelect
								dateFormat='dd/MM/yy - h:mm aa'
							/>
						</>
					)}
					{type === 'cancel' && (
						<CustomFormField
							control={form.control}
							name='cancellationReason'
							placeholder='Enter reason for cancellation'
							label='Reason for cancellation'
							fieldType={FormFieldTypes.TEXTAREA}
						/>
					)}
					<SubmitBtn
						isLoading={isLoading}
						className={`${
							type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
						} w-full`}
					>
						{btnLabel}
					</SubmitBtn>
				</form>
			</Form>
		</section>
	)
}

export default AppointmentForm
