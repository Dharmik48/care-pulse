import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { Mail } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import StatCard from '@/components/StatCard'
import { calculateStatCount } from '@/lib/utils'
import { getAppointments } from '@/lib/actions/appointment.actions'
import Link from 'next/link'

const Doctor = async ({ params }: SearchParamProps) => {
	const { id } = params
	const { user } = await getLoggedInUser()

	const url = user!.labels.includes('doctor')
		? `/doctor/${user!.$id}`
		: `/patient/${user!.$id}`

	if (user!.$id !== id) return redirect(url)

	const { appointments } = await getAppointments(id)
	const statCounts = calculateStatCount(appointments)

	return (
		<section className='lg:xl'>
			<div className='mb-8'>
				<h3 className='text-2xl md:text-4xl font-bold mb-4'>
					Hi there👋🏻, {user!.name}
				</h3>
				<p className='text-dark-700 flex items-center gap-2'>
					<Mail size={18} />
					{user!.email}
				</p>
			</div>
			<Separator className='my-6' />
			<section className='space-y-6'>
				<h3 className='sub-header'>Appointments Summary</h3>
				<section className='admin-stat'>
					<StatCard
						type='appointments'
						label='Scheduled appointments'
						icon='/assets/icons/appointments.svg'
						count={statCounts.scheduled}
					/>
					<StatCard
						type='pending'
						label='Pending appointments'
						icon='/assets/icons/pending.svg'
						count={statCounts.pending}
					/>
					<StatCard
						type='cancelled'
						label='Cancelled appointments'
						icon='/assets/icons/cancelled.svg'
						count={statCounts.cancelled}
					/>
				</section>
				<p>
					Manage all appointments{' '}
					<Link
						href={`/doctor/${id}/appointments`}
						className='underline text-primary'
					>
						here
					</Link>
					.
				</p>
			</section>
		</section>
	)
}

export default Doctor
