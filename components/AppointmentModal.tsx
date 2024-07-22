'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import clsx from 'clsx'
import AppointmentForm from './AppointmentForm'
import { Appointment } from '@/types/appwrite.types'
import { useState } from 'react'
import { Button } from './ui/button'

interface Props {
	type: 'schedule' | 'cancel'
	patientId: string
	userId: string
	appointment: Appointment
	disabled?: boolean
}

const AppointmentModal = ({
	type,
	appointment,
	patientId,
	userId,
	disabled,
}: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={'ghost'}
					className={clsx('capitalize', {
						'text-green-500': type === 'schedule',
					})}
					disabled={disabled}
				>
					{type}
				</Button>
			</DialogTrigger>
			<DialogContent className='shad-dialog sm:max-w-md'>
				<DialogHeader className='mb-4 space-y-3'>
					<DialogTitle className='capitalize'>{type} appointment</DialogTitle>
					<DialogDescription>
						Please fill in the following details to {type} appointment
					</DialogDescription>
				</DialogHeader>
				<AppointmentForm
					type={type}
					patientId={patientId}
					userId={userId}
					appointment={appointment}
					setOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default AppointmentModal
