'use client'

import { forwardRef, useState } from 'react'
import CustomFormField from './CustomFormField'
import SubmitBtn from './SubmitBtn'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PatientFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { FormFieldTypes, GenderOptions } from '@/constants'
import { Label } from './ui/label'
import { Input } from './ui/input'

const RegisterForm = ({ user }: { user: User }) => {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof PatientFormSchema>>({
		resolver: zodResolver(PatientFormSchema),
		defaultValues: {
			username: '',
			email: '',
			phone: '',
		},
	})
	return (
		<Form {...form}>
			<form className='flex-1 space-y-12'>
				<div className='space-y-4'>
					<h2 className='header'>Welcome👋🏻,</h2>
					<p className='text-dark-700'>Let us know more about yourself.</p>
				</div>
				<section className='space-y-6'>
					<div className='mb-8'>
						<h3 className='sub-header'>Personal Information</h3>
					</div>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldTypes.TEXT}
						name='fullname'
						placeholder='ex: John Doe'
						label='Full name'
					/>
					{/* Email and phone */}
					<div className='flex flex-col lg:flex-row gap-6'>
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
							className='lg:w-1/2'
						/>
					</div>
					{/* DOB and gender */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							name='birthDate'
							placeholder='Your birth date'
							label='Date of birth'
							fieldType={FormFieldTypes.DATE}
							iconSrc='/assets/icons/calendar.svg'
						/>
						<CustomFormField
							control={form.control}
							name='gender'
							label='Gender'
							fieldType={FormFieldTypes.SKELETON}
							renderSkeleton={field => (
								<RadioGroup
									onChange={field.onChange}
									defaultValue={field.value}
									className='flex h-11 gap-4 lg:justify-between'
								>
									{GenderOptions.map(gender => (
										<div key={gender} className='radio-group'>
											<RadioGroupItem value={gender} id={gender} />
											<Label
												htmlFor={gender}
												className='cursor-pointer capitalize w-full'
											>
												{gender}
											</Label>
										</div>
									))}
								</RadioGroup>
							)}
						/>
					</div>
					{/* address and occupation */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldTypes.TEXT}
							name='address'
							placeholder='ex: 14 street, Delhi'
							label='Address'
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldTypes.TEXT}
							name='occupation'
							placeholder='ex: Engineer'
							label='Occupation'
						/>
					</div>
					{/* emergency name and contact */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							name='emergencyContactName'
							placeholder="Guardian's name"
							label='Emergency Contact Name'
							fieldType={FormFieldTypes.TEXT}
						/>
						<CustomFormField
							control={form.control}
							name='emergencyContactNumber'
							placeholder='+00 0342 0453 34'
							label='Emergency Contact Number'
							fieldType={FormFieldTypes.PHONE}
							className='lg:w-1/2'
						/>
					</div>
				</section>

				<SubmitBtn isLoading={isLoading}>Get Started</SubmitBtn>
			</form>
		</Form>
	)
}

export default RegisterForm
