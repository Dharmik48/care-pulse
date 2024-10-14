import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { Mail, Pencil } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const Doctor = async ({ params }: SearchParamProps) => {
	const { id } = params
	const { user } = await getLoggedInUser()

	const url = user.labels.includes('doctor')
		? `/doctor/${user.$id}`
		: `/patient/${user.$id}`

	if (user.$id !== id) return redirect(url)

	return (
		<section className='lg:xl'>
			<div className='mb-8'>
				<h3 className='text-2xl md:text-4xl font-bold mb-4'>
					Hi there👋🏻, {user.name}
				</h3>
				<p className='text-dark-700 flex items-center gap-2'>
					<Mail size={18} />
					{user.email}
				</p>
			</div>
			<Separator className='my-6' />
			<section className='space-y-6'>
				<div className='mb-4 flex justify-between items-center flex-wrap gap-4'>
					<h3 className='sub-header'>Guides</h3>
					<Link href={`/guides/${id}/new-guide`}>
						<Button>
							<Pencil size={18} className='mr-1' /> New Guide
						</Button>
					</Link>
				</div>
			</section>
		</section>
	)
}

export default Doctor