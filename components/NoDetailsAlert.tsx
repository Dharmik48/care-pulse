import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {Info} from 'lucide-react'
import Link from 'next/link'

export function NoDetailsAlert({title, link, description}: { title: string, link: string, description: string }) {
    return (
        <Alert className={'border-border'}>
            <Info className='h-4 w-4'/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                Add your details{' '}
                <Link href={link} className='underline'>
                    here
                </Link>{' '}
                {description}
            </AlertDescription>
        </Alert>
    )
}