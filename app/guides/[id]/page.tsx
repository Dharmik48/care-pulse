import { getGuide } from '@/lib/actions/guide.actions'
import { formatDateTime } from '@/lib/utils'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

const Guide = async ({ params }: SearchParamProps) => {
	const { id } = params

	const { guide, error } = await getGuide(id)

	if (error || !guide) redirect('/guides')

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<h1 className='text-3xl font-bold'>{guide.title}</h1>
				<div className='flex items-center gap-2'>
					<div className='font-medium flex items-center gap-1'>
						<Image
							width={24}
							height={24}
							src={guide.doctor?.avatar!}
							alt={guide.doctor?.name!}
							className={'rounded-full'}
						/>
						{guide.doctor?.name}
					</div>
					&middot;
					<div className='font-medium text-muted-foreground'>
						{formatDateTime(guide.$updatedAt).dateTime}
					</div>
				</div>
			</div>
			<Separator />
			<div dangerouslySetInnerHTML={{ __html: guide.body }}></div>
		</div>
	)
}

export default Guide
