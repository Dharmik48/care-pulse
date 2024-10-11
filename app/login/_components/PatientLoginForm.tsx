'use client'

import CustomFormField from '@/components/CustomFormField'
import { useToast } from '@/components/hooks/use-toast'
import SubmitBtn from '@/components/SubmitBtn'
import { Form } from '@/components/ui/form'
import { FormFieldTypes } from '@/constants'
import { loginUser } from '@/lib/actions/patient.actions'
import { account } from '@/lib/appwrite.config'
import { LoginFormValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const PatientLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof LoginFormValidation>>({
		resolver: zodResolver(LoginFormValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
		setIsLoading(true)
		const { email, password } = values

		try {
			const { error } = await loginUser(email, password)

			if (error) throw new Error(error)
		} catch (error: any) {
			toast({
				title: 'Oh no! Something went wrong.',
				description: error.message,
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section>
			<div className='mb-8'>
				<h3 className='text-4xl font-bold mb-4'>Welcome back👋🏻,</h3>
				<p className='text-dark-700'>Get Started with Appointments.</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
					<SubmitBtn isLoading={isLoading}>Login</SubmitBtn>
				</form>
			</Form>
		</section>
	)
}

export default PatientLoginForm
