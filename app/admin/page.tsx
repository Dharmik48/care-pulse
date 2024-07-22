import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { getAppointments } from '@/lib/actions/appointment.actions'
import { calculateStatCount } from '@/lib/utils'
import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/columns'

const Admin = async () => {
	const appointmentsList = await getAppointments()
	const statCounts = calculateStatCount(appointmentsList.documents)

	return (
		<div className='mx-auto flex max-w-7xl flex-col space-y-14'>
			<header className='admin-header'>
				<Link href='/' className='cursor-pointer'>
					<Image
						src='/assets/icons/logo-full.svg'
						height={32}
						width={162}
						alt='logo'
						className='h-8 w-fit'
					/>
				</Link>

				<p className='text-16-semibold'>Admin Dashboard</p>
			</header>

			<main className='admin-main'>
				<section className='w-full space-y-2'>
					<h2 className='header'>Welcome, Admin</h2>
					<p className='text-dark-700'>
						Start day with managing new appointments
					</p>
				</section>
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
				<DataTable columns={columns} data={appointmentsList.documents} />
			</main>
		</div>
	)
}

export default Admin
