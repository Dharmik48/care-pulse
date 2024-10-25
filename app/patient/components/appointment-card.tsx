import Image from 'next/image'
import { Doctors } from '@/constants'
import { cn, formatDateTime } from '@/lib/utils'
import { Appointment } from '@/types/appwrite.types'
import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {getDoctor} from "@/lib/actions/doctor.actions";

const AppointmentCard = async ({
	appointment,
	showBadge,
}: {
	appointment: Appointment
	showBadge?: boolean
}) => {
	// TODO: change pending to yellow
	const {doctor} = await getDoctor(appointment.primaryPhysician.$id)
	return (
		<li
			key={appointment.$id}
			className={cn(
				'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all border-border text-card-foreground group',
				appointment.status === 'scheduled' && 'hover:bg-accent',
				appointment.status === 'cancelled' && 'hover:bg-destructive/50',
				appointment.status === 'pending' && 'hover:bg-cyan-400/50'
			)}
		>
			<div className='flex w-full flex-col gap-1'>
				<div className='flex items-center'>
					<div className='flex items-center gap-2'>
						<div className='font-semibold'>{appointment.reason}</div>
					</div>
					<div className='ml-auto text-xs text-foreground'></div>
				</div>
				<div className='flex items-center gap-2'>
					<div className='text-xs font-medium flex items-center gap-1'>
						<Calendar size={16} />
						{formatDateTime(appointment.schedule).dateTime}
					</div>
					&middot;
					<div className='text-xs font-medium flex items-center gap-1'>
						<Image
							width={16}
							height={16}
							src={doctor?.image!}
							alt={doctor?.name!}
						/>
						{doctor?.name}
					</div>
				</div>
			</div>
			<div className='line-clamp-2 text-xs text-muted-foreground group-hover:text-destructive-foreground transition-colors'>
				{!!appointment.cancellationReason
					? `Reason: ${appointment.cancellationReason.substring(0, 300)}`
					: appointment.note.substring(0, 300)}
			</div>
			{showBadge && (
				<div className='flex items-center gap-2'>
					<Badge
						className={cn(
							appointment.status === 'scheduled' && 'bg-primary',
							appointment.status === 'cancelled' && 'bg-destructive',
							appointment.status === 'pending' && 'bg-cyan-400'
						)}
					>
						{appointment.status}
					</Badge>
				</div>
			)}
		</li>
	)
}

export default AppointmentCard