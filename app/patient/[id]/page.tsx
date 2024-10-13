import {
	getLoggedInUser,
	getPatientByUserId,
} from '@/lib/actions/patient.actions'
import {
	CalendarCheck2,
	CalendarClock,
	CalendarDays,
	CalendarX2,
	Mail,
	PlusCircle,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import { NoPatientDetailsAlert } from '../components/no-patient-details-alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const Patient = async ({ params }: SearchParamProps) => {
	const { id } = params
	const { user } = await getLoggedInUser()

	const url = user.labels.includes('doctor')
		? `/doctor/${user.$id}`
		: `/patient/${user.$id}`

	if (user.$id !== id) return redirect(url)

	const { patient: patientDetails } = await getPatientByUserId(id)

	return (
		<section>
			<div className='mb-8'>
				<h3 className='text-4xl font-bold mb-4'>Hi there👋🏻, {user.name}</h3>
				<p className='text-dark-700 flex items-center gap-2'>
					<Mail size={18} />
					{user.email}
				</p>
			</div>
			<Separator className='my-6' />
			<section className='space-y-6'>
				<div className='mb-4 flex justify-between items-center'>
					<h3 className='sub-header'>Appointments</h3>
					<Link href={`/patient/${id}/new-appointment`}>
						<Button>
							<PlusCircle size={18} className='mr-1' /> New Appointment
						</Button>
					</Link>
				</div>
				{!patientDetails ? (
					<NoPatientDetailsAlert id={id} />
				) : (
					<div className='space-y-8'>
						<div>
							<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
								<CalendarCheck2 size={20} /> Scheduled
							</h4>
						</div>
						<div>
							<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
								<CalendarClock size={20} /> Pending
							</h4>
						</div>
						<div>
							<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
								<CalendarX2 size={20} />
								Cancelled
							</h4>
						</div>
						<div>
							<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
								<CalendarDays size={20} />
								Past Appointments
							</h4>
						</div>
					</div>
				)}
			</section>
		</section>
	)
}

export default Patient
