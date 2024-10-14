import { Appointment } from '@/types/appwrite.types'
import AppointmentList from './appointment-list'

interface Props {
	icon: React.ReactNode
	appointments?: Appointment[]
	title: string
	emptyMessage: string
	showBadge?: boolean
}

const AppointmentSection = ({
	icon,
	appointments,
	emptyMessage,
	title,
	...props
}: Props) => {
	return (
		<div>
			<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
				{icon} {title}
			</h4>
			{!appointments || appointments.length === 0 ? (
				<p className='text-muted-foreground'>{emptyMessage}</p>
			) : (
				<AppointmentList appointments={appointments} {...props} />
			)}
		</div>
	)
}

export default AppointmentSection
