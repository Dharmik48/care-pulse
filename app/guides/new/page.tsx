import Image from 'next/image'
import Link from 'next/link'
import GuideForm from '@/app/guides/_components/GuideForm'
import { getLoggedInUser } from '@/lib/actions/patient.actions'
import { redirect } from 'next/navigation'

const Guide = async () => {
	const { user } = await getLoggedInUser()

	if (!user || !user.labels.includes('doctor')) return redirect('/login')

	return (
		<>
			<GuideForm userId={user!.$id} />
			<div className='text-14-regular flex-grow flex items-end justify-center'>
				<p className='copyright'>&copy;carepulse {new Date().getFullYear()}</p>
			</div>
		</>
	)
}

export default Guide
