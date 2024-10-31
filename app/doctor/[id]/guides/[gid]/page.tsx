import Image from 'next/image'
import Link from 'next/link'
import GuideForm from '@/app/guides/_components/GuideForm'
import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { redirect } from 'next/navigation'
import { getGuide } from '@/lib/actions/guide.actions'

const Guide = async ({ params }: SearchParamProps) => {
	const { id, gid } = params
	const { user } = await getLoggedInUser()

	if (!user || !user.labels.includes('doctor')) return redirect('/login')

	const { guide, error } = await getGuide(gid)
	if (!guide || error) return redirect(`/doctor/${id}`)

	if (guide.doctor.$id !== user.$id) return redirect('/login')

	return (
		<section className='h-full'>
			<GuideForm userId={user!.$id} guide={guide} />
		</section>
	)
}

export default Guide
