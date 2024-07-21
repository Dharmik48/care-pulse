'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { decryptKey, encryptKey } from '@/lib/utils'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PasskeyModal = () => {
	const router = useRouter()
	const [open, setOpen] = useState(true)
	const [passkey, setPasskey] = useState('')
	const [error, setError] = useState('')

	const closeModal = () => {
		setOpen(false)
		router.push('/')
	}

	const encryptedKey =
		typeof window !== 'undefined' ? localStorage.getItem('passkey') : null

	useEffect(() => {
		if (!encryptedKey) return setOpen(true)

		const decryptedKey = decryptKey(encryptedKey)
		if (decryptedKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) return setOpen(true)

		setOpen(false)
		router.push('/admin')
	}, [encryptedKey])

	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault()
		if (passkey !== process.env.NEXT_PUBLIC_ADMIN_KEY)
			return setError('Invalid Key. Please try again')

		const encryptedKey = encryptKey(passkey)

		localStorage.setItem('passkey', encryptedKey)
		setOpen(false)
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className='shad-dialog'>
				<AlertDialogHeader>
					<div className='flex justify-between'>
						<AlertDialogTitle>Verify Passkey</AlertDialogTitle>

						<Image
							src={'/assets/icons/close.svg'}
							height={24}
							width={24}
							alt='close'
							className='cursor-pointer'
							onClick={closeModal}
						/>
					</div>
					<AlertDialogDescription className='text-dark-700'>
						Please enter the admin passkey to enter the admin page.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<InputOTP
						maxLength={6}
						value={passkey}
						onChange={val => setPasskey(val)}
					>
						<InputOTPGroup className='shad-otp'>
							<InputOTPSlot index={0} className='shad-otp-slot' />
							<InputOTPSlot index={1} className='shad-otp-slot' />
							<InputOTPSlot index={2} className='shad-otp-slot' />
							<InputOTPSlot index={3} className='shad-otp-slot' />
							<InputOTPSlot index={4} className='shad-otp-slot' />
							<InputOTPSlot index={5} className='shad-otp-slot' />
						</InputOTPGroup>
					</InputOTP>
				</div>
				{error && <p className='shad-error'>{error}</p>}
				<AlertDialogFooter>
					<AlertDialogAction
						className='shad-primary-btn w-full'
						onClick={handleSubmit}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default PasskeyModal
