import { Button } from './ui/button'
import Image from 'next/image'

interface Props {
	className?: string
	children: React.ReactNode
	isLoading: boolean
}

const SubmitBtn = ({ className, children, isLoading }: Props) => {
	return (
		<Button
			type='submit'
			className={className ?? 'shad-primary-btn w-full'}
			disabled={isLoading}
		>
			{isLoading ? (
				<>
					<Image
						src='/assets/icons/loader.svg'
						alt='loader'
						width={24}
						height={24}
						className='animate-spin mr-2'
					/>
					Loading...
				</>
			) : (
				children
			)}
		</Button>
	)
}

export default SubmitBtn
