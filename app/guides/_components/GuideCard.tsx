import { Badge } from '@/components/ui/badge'
import { cn, formatDateTime } from '@/lib/utils'
import { Guide } from '@/types/appwrite.types'
import { Clock, ExternalLink, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import DeleteDialog from './DeleteDialog'

const GuideCard = ({ guide }: { guide: Guide }) => {
	return (
		<li
			className={cn(
				'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all border-border text-card-foreground group',
				guide.status === 'published' && 'hover:bg-accent',
				guide.status === 'draft' && 'hover:bg-yellow-500/50'
			)}
		>
			<div className='flex w-full flex-col gap-1'>
				<div className='flex items-center relative'>
					<div className='flex items-center gap-2'>
						<div className='font-semibold text-lg'>{guide.title}</div>
					</div>
					<div className='md:flex items-center gap-2 absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity hidden'>
						{guide.status === 'draft' ? (
							<Link href={`/doctor/${guide.doctor.$id}/guides/${guide.$id}`}>
								<Badge className='bg-primary hover:underline hover:opacity-100'>
									<Pencil size={14} className='mr-1' /> Edit
								</Badge>
							</Link>
						) : (
							<Link href={`/guides/${guide.$id}`}>
								<Badge className='bg-primary hover:underline hover:opacity-100'>
									<ExternalLink size={14} className='mr-1' /> Visit
								</Badge>
							</Link>
						)}
						<DeleteDialog gid={guide.$id} id={guide.doctor.$id}>
							<Badge className='bg-destructive hover:opacity-100 hover:bg-destructive/80'>
								<Trash size={14} className='mr-1' /> Delete
							</Badge>
						</DeleteDialog>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<div className='text-xs font-medium flex items-center gap-1'>
						<Clock size={16} />
						{formatDateTime(guide.$updatedAt).dateTime}
					</div>
				</div>
			</div>
			<div className='line-clamp-2 text-xs text-muted-foreground group-hover:text-destructive-foreground transition-colors'>
				{guide.body.replace(/<[^>]*>?/gm, '').substring(0, 300)}
			</div>
			<div className='md:hidden items-center gap-2 flex'>
				{guide.status === 'draft' ? (
					<Link href={`/doctor/${guide.doctor.$id}/guides/${guide.$id}`}>
						<Badge className='bg-primary hover:underline hover:opacity-100'>
							<Pencil size={14} className='mr-1' /> Edit
						</Badge>
					</Link>
				) : (
					<Link href={`/guides/${guide.$id}`}>
						<Badge className='bg-primary hover:underline hover:opacity-100'>
							<ExternalLink size={14} className='mr-1' /> Visit
						</Badge>
					</Link>
				)}
				<DeleteDialog gid={guide.$id} id={guide.doctor.$id}>
					<Badge className='bg-destructive hover:opacity-100 hover:bg-destructive/80'>
						<Trash size={14} className='mr-1' /> Delete
					</Badge>
				</DeleteDialog>
			</div>
		</li>
	)
}

export default GuideCard
