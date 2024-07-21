import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'

const Admin = () => {
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
						label='Total number of scheduled appointments'
						icon='/assets/icons/appointments.svg'
						count={90}
					/>
					<StatCard
						type='pending'
						label='Total number of pending appointments'
						icon='/assets/icons/pending.svg'
						count={90}
					/>
					<StatCard
						type='cancelled'
						label='Total number of cancelled appointments'
						icon='/assets/icons/cancelled.svg'
						count={90}
					/>
				</section>
			</main>
		</div>
	)
}

export default Admin
