import { formatDateTime } from '@/lib/utils'
import { Guide } from '@/types/appwrite.types'
import Link from 'next/link'
import Image from 'next/image'

const GuideCard = ({ guide }: { guide: Guide }) => {
	return (
		<li className='flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all border-border text-card-foreground group'>
			<div className='flex w-full flex-col gap-1'>
				<div className='flex items-center relative'>
					<div className='flex items-center gap-2'>
						<h3 className='font-semibold text-lg'>{guide.title}</h3>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<div className='text-xs font-medium flex items-center gap-1'>
						<Image
							width={16}
							height={16}
							src={guide.doctor?.avatar!}
							alt={guide.doctor?.name!}
							className={'rounded-full'}
						/>
						{guide.doctor?.name}
					</div>
					&middot;
					<div className='text-xs font-medium flex items-center gap-1 text-muted-foreground'>
						{formatDateTime(guide.$updatedAt).dateTime}
					</div>
				</div>
			</div>
			<div className='line-clamp-2'>
				{guide.body.replace(/<[^>]*>?/gm, '').substring(0, 300)}
			</div>
			<Link
				href={`/guides/${guide.$id}`}
				className='group-hover:underline hover:text-primary transition-colors text-muted-foreground'
			>
				Read More
			</Link>
		</li>
	)
}

export default GuideCard
