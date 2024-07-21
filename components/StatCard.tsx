import clsx from 'clsx'
import Image from 'next/image'

interface Props {
	type: 'appointments' | 'cancelled' | 'pending'
	icon: string
	label: string
	count: number
}

const StatCard = ({ type, icon, label, count }: Props) => {
	const bg = `bg-${type}`

	return (
		<div
			className={clsx('stat-card', {
				'bg-appointments': type === 'appointments',
				'bg-cancelled': type === 'cancelled',
				'bg-pending': type === 'pending',
			})}
		>
			<div className='flex items-center gap-4'>
				<Image
					src={icon}
					width={32}
					height={32}
					alt={type}
					className='size-8 w-fit'
				/>
				<h3 className='text-32-bold'>{count}</h3>
			</div>
			<p className='text-14-regular'>{label}</p>
		</div>
	)
}

export default StatCard
