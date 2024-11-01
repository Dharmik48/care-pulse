'use client'

import { useToast } from '@/components/hooks/use-toast'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { removeGuide } from '@/lib/actions/guide.actions'

const DeleteDialog = ({
	children,
	gid,
	id,
}: {
	children: React.ReactNode
	gid: string
	id: string
}) => {
	const { toast } = useToast()

	const handleAgree = async () => {
		const { error } = await removeGuide(gid, id)
		if (error)
			return toast({
				title: 'Something went wrong!',
				description: error,
				variant: 'destructive',
			})
		toast({
			title: 'Successfully deleted guide',
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>{children}</AlertDialogTrigger>
			<AlertDialogContent className='border-border'>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='hover:bg-background/80'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className='bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive'
						onClick={handleAgree}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteDialog
