'use client'

import CustomFormField from '@/components/CustomFormField'
import SubmitBtn from '@/components/SubmitBtn'
import { Form } from '@/components/ui/form'
import { FormFieldTypes } from '@/constants'
import { account } from '@/lib/appwrite.config'
import { LoginFormValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const PatientLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof LoginFormValidation>>({
		resolver: zodResolver(LoginFormValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
		const { email, password } = values

		try {
			const res = await account.createEmailPasswordSession(email, password)
			console.log(res)
		} catch (error: any) {
			console.log(error)
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
					<SubmitBtn isLoading={isLoading}>Get Started</SubmitBtn>
				</form>
			</Form>
		</section>
	)
}

export default PatientLoginForm
