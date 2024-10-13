import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import Link from 'next/link'

export function NoPatientDetailsAlert({ id }: { id: string }) {
	return (
		<Alert variant={'destructive'}>
			<Info className='h-4 w-4' />
			<AlertTitle>Personal details not set!</AlertTitle>
			<AlertDescription>
				Add your details{' '}
				<Link href={`/patient/${id}/details`} className='underline'>
					here
				</Link>{' '}
				to get started with appointments.
			</AlertDescription>
		</Alert>
	)
}
