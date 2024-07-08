'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './ui/form'
import { Button } from './ui/button'
import CustomFormField from './CustomFormField'

export enum FormFieldTypes {
	TEXT = 'text',
	TEXTAREA = 'textarea',
	DATE = 'date',
	CHECKBOX = 'checkbox',
	EMAIL = 'email',
	PHONE = 'phone',
}

const formSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be atleat 2 characters.' }),
	email: z.string().email('Enter a valid email.'),
	phone: z.string(),
})

const PatientForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			phone: '',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
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
						name='Username'
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
						name='phone'
						placeholder='+00 0342 0453 34'
						label='Phone number'
						fieldType={FormFieldTypes.PHONE}
						iconSrc='/assets/icons/phone.svg'
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</section>
	)
}

export default PatientForm
