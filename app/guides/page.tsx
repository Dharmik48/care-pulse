import Navbar from '@/components/Navbar'
import { getGuides } from '@/lib/actions/guide.actions'
import GuideCard from './_components/GuideCardHome'
import { Query } from 'node-appwrite'

export const revalidate = 10

const Guides = async () => {
	const { guides } = await getGuides([
		Query.orderDesc('$updatedAt'),
		Query.startsWith('status', 'published'),
	])

	return (
		<>
			<h2 className='font-bold text-xl lg:text-2xl'>Latest Guides</h2>
			{guides?.map(guide => (
				<GuideCard guide={guide} key={guide.$id} />
			))}
		</>
	)
}

export default Guides
