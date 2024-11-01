import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { Mail } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

const Doctor = async ({ params }: SearchParamProps) => {
	const { id } = params
	const { user } = await getLoggedInUser()

	const url = user!.labels.includes('doctor')
		? `/doctor/${user!.$id}`
		: `/patient/${user!.$id}`

	if (user!.$id !== id) return redirect(url)

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
		</section>
	)
}

export default Doctor
