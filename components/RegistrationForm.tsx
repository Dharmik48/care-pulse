'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './ui/form'
import CustomFormField from './CustomFormField'
import SubmitBtn from './SubmitBtn'
import { useState } from 'react'
import { RegistrationFormValidation } from '@/lib/validations'
import { createAccount } from '@/lib/actions/patient.actions'
import { useRouter } from 'next/navigation'
import { FormFieldTypes } from '@/constants'
import { useToast } from '@/components/hooks/use-toast'

const RegistrationForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()

	const form = useForm<z.infer<typeof RegistrationFormValidation>>({
		resolver: zodResolver(RegistrationFormValidation),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (
		values: z.infer<typeof RegistrationFormValidation>
	) => {
		setIsLoading(true)

		try {
			const user = {
				name: values.name,
				email: values.email,
				password: values.password,
			}

			const res = await createAccount(user)

			if (res.error) throw new Error(res.error)

			toast({ title: 'Success!', description: 'Account created successfully.' })
			if (res.account) router.push(`/patients/${res.account.$id}/register`)
		} catch (error: any) {
			toast({
				title: 'Oh no! Something went wrong.',
				description: error.message,
				variant: 'destructive',
			})
		}

		setIsLoading(false)
	}

	return (
		<section>
			<div className='mb-8'>
				<h3 className='text-4xl font-bold mb-4'>Hi there👋🏻,</h3>
				<p className='text-dark-700'>Get Started with Appointments.</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldTypes.TEXT}
						name='name'
						placeholder='John Doe'
						label='Username'
						iconSrc='/assets/icons/user.svg'
					/>
					<CustomFormField
						control={form.control}
						name='email'
						placeholder='abc@def.xyz'
						label='Email address'
						fieldType={FormFieldTypes.EMAIL}
						iconSrc='/assets/icons/email.svg'
					/>
					<CustomFormField
						control={form.control}
						name='password'
						placeholder='********'
						label='Password'
						fieldType={FormFieldTypes.PASSWORD}
						iconSrc='/assets/icons/key.svg'
					/>
					<CustomFormField
						control={form.control}
						name='confirmPassword'
						placeholder='********'
						label='Confirm Password'
						fieldType={FormFieldTypes.PASSWORD}
						iconSrc='/assets/icons/key.svg'
					/>
					<SubmitBtn isLoading={isLoading}>Get Started</SubmitBtn>
				</form>
			</Form>
		</section>
	)
}

export default RegistrationForm
