import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getDoctorByUserId } from '@/lib/actions/doctor.actions'
import { NoDetailsAlert } from '@/components/NoDetailsAlert'
import { BookCheck, BookDashed, Pencil } from 'lucide-react'
import { getDoctorGuides } from '@/lib/actions/guide.actions'
import GuideCard from '@/app/guides/_components/GuideCard'

const Guides = async ({ params }: SearchParamProps) => {
	const { id } = params

	const { doctor } = await getDoctorByUserId(id)
	const { guides } = await getDoctorGuides(id)

	const drafts = guides?.filter(guide => guide.status === 'draft')
	const published = guides?.filter(guide => guide.status === 'published')

	return (
		<section className='space-y-6'>
			<div className='mb-4 flex justify-between items-center flex-wrap gap-4'>
				<h3 className='sub-header'>Guides</h3>
				{doctor && (
					<Link href={`/guides/new`}>
						<Button>
							<Pencil size={18} className='mr-1' /> New Guide
						</Button>
					</Link>
				)}
			</div>
			{!doctor ? (
				<NoDetailsAlert
					title={'Professional details not set!'}
					link={`/doctor/${id}/details`}
					description={'to start writing guides.'}
				/>
			) : (
				<div className='space-y-8'>
					<section>
						<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
							<BookDashed size={20} className='text-yellow-500' />
							Drafts &middot; {drafts?.length}
						</h4>
						{drafts?.length ? (
							<ul className='space-y-4 mt-4'>
								{drafts.map(guide => (
									<GuideCard key={guide.$id} guide={guide} />
								))}
							</ul>
						) : (
							<p className='mt-4 text-muted-foreground'>
								Drafts is empty. Start writing a{' '}
								<Link href={'/guides/new'} className='underline'>
									new guide
								</Link>
								.
							</p>
						)}
					</section>
					<section>
						<h4 className='text-base md:text-lg font-bold flex items-center gap-1'>
							<BookCheck size={20} className='text-primary' />
							Published &middot; {published?.length}
						</h4>
						{published?.length ? (
							<ul className='space-y-4 mt-4'>
								{published.map(guide => (
									<GuideCard key={guide.$id} guide={guide} />
								))}
							</ul>
						) : (
							<p className='mt-4 text-muted-foreground'>
								No published guides. Publish a{' '}
								<Link href={'/guides/new'} className='underline'>
									new guide
								</Link>{' '}
								today.
							</p>
						)}
					</section>
				</div>
			)}
		</section>
	)
}

export default Guides
