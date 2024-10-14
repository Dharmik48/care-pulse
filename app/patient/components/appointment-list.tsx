import { Appointment } from '@/types/appwrite.types'
import AppointmentCard from './appointment-card'

const AppointmentList = ({
	appointments,
	...props
}: {
	appointments: Appointment[]
}) => {
	return (
		<ul className='space-y-4 mt-4'>
			{appointments.map(appointment => (
				<AppointmentCard
					key={appointment.$id}
					appointment={appointment}
					{...props}
				/>
			))}
		</ul>
	)
}

export default AppointmentList
