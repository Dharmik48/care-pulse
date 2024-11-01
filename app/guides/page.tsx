import Navbar from '@/components/Navbar'
import { getGuides } from '@/lib/actions/guide.actions'
import GuideCard from './_components/GuideCardHome'

const Guides = async () => {
	const { guides } = await getGuides()

	return (
		<main className='flex min-h-screen'>
			<div className='container'>
				<section className='sub-container space-y-8 max-w-screen-lg h-full'>
					<Navbar />
					<h2 className='font-bold text-xl lg:text-2xl'>Latest Guides</h2>
					{guides?.map(guide => (
						<GuideCard guide={guide} key={guide.$id} />
					))}
				</section>
			</div>
		</main>
	)
}

export default Guides
