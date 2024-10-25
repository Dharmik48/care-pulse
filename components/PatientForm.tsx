'use client'

import { useState } from 'react'
import CustomFormField from './CustomFormField'
import SubmitBtn from './SubmitBtn'
import { Form, FormControl } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PatientFormValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
	FormFieldTypes,
	GenderOptions,
	IdentificationTypes,
	PatientFormDefaultValues,
} from '@/constants'
import { Label } from './ui/label'
import { SelectItem } from './ui/select'
import Image from 'next/image'
import FileUploader from './FileUploader'
import { registerUser } from '@/lib/actions/patient.actions'
import { useToast } from './hooks/use-toast'
import {Doctor, Patient} from '@/types/appwrite.types'

const PatientForm = ({
	user,
	patient,
	doctors
}: {
	user: User
	patient: null | Patient
	doctors: Doctor[]
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: patient
			? { ...patient, identificationDocument: [], primaryPhysician: patient.primaryPhysician.$id }
			: {
					...PatientFormDefaultValues,
					name: user.name || '',
					email: user.email || '',
					phone: user.phone || '',
			  },
	})

	const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
		setIsLoading(true)

		let formData
		// if image of doc is present convert it to blob and form data
		if (
			values.identificationDocument &&
			values.identificationDocument.length > 0
		) {
			const blob = new Blob([values.identificationDocument[0]], {
				type: values.identificationDocument[0].type,
			})

			formData = new FormData()
			formData.append('blobFile', blob)
			formData.append('fileName', values.identificationDocument[0].name)
		}

		try {
			// extract values from form
			const data: any = {
				...values,
				name: user.name,
				userId: user.$id,
				birthDate: new Date(values.birthDate),
				identificationDocument: formData,
			}
			// add to database

			const patient = await registerUser(data)

			// toast on success
			if (patient)
				toast({
					title: 'Action success.',
					description: 'Details saved successfully',
				})
		} catch (error) {
			console.log(error)
		}

		setIsLoading(false)
	}

	return (
		<Form {...form}>
			<form
				className='flex-1 space-y-12'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{/* Personal info */}
				<section className='space-y-6'>
					<div className='mb-8'>
						<h3 className='sub-header'>Personal Information</h3>
					</div>
					<CustomFormField
						control={form.control}
						fieldType={FormFieldTypes.TEXT}
						name='name'
						placeholder='ex: John Doe'
						label='Full name'
						disabled={!!patient}
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
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							name='phone'
							placeholder='+00 0342 0453 34'
							label='Phone number'
							fieldType={FormFieldTypes.PHONE}
							disabled={!!patient}
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
							disabled={!!patient}
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
									disabled={!!patient}
								>
									{GenderOptions.map(gender => (
										<div key={gender} className='radio-group'>
											<RadioGroupItem
												className='h-auto peer'
												value={gender}
												id={gender}
											/>
											<Label
												htmlFor={gender}
												className='cursor-pointer capitalize w-full peer-disabled:cursor-not-allowed'
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
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldTypes.TEXT}
							name='occupation'
							placeholder='ex: Engineer'
							label='Occupation'
							disabled={!!patient}
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
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							name='emergencyContactNumber'
							placeholder='+00 0342 0453 34'
							label='Emergency Contact Number'
							fieldType={FormFieldTypes.PHONE}
							disabled={!!patient}
							className='lg:w-1/2'
						/>
					</div>
				</section>

				{/* Medical info */}
				<section className='space-y-6'>
					<div className='mb-8'>
						<h3 className='sub-header'>Medical Information</h3>
					</div>
					<CustomFormField
						control={form.control}
						name='primaryPhysician'
						placeholder='Select your primary physician'
						label='Primary Physician'
						fieldType={FormFieldTypes.SELECT}
						disabled={!!patient}
					>
						{doctors.map(doctor => (
							<SelectItem
								key={doctor.$id}
								value={doctor.$id}
								className='cursor-pointer hover:bg-dark-500'
							>
								<div className='flex gap-2 items-center'>
									<Image
										src={doctor.avatar}
										width={32}
										height={32}
										alt={`${doctor.name} picture`}
										className='rounded-full border border-dark-500'
									/>
									<p>{doctor.name}</p>
								</div>
							</SelectItem>
						))}
					</CustomFormField>
					{/* Insurace provider and number */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							name='insuranceProvider'
							placeholder='ex: BlueCross'
							label='Insurance Provider'
							fieldType={FormFieldTypes.TEXT}
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							name='insurancePolicyNumber'
							placeholder='ex: ABC1234567'
							label='Insurance Policy Number'
							fieldType={FormFieldTypes.TEXT}
							disabled={!!patient}
							className='lg:w-1/2'
						/>
					</div>
					{/* Allergies and medications */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							name='allergies'
							placeholder='ex: Peanuts, Penicillin, Pollen'
							label='Allergies'
							fieldType={FormFieldTypes.TEXTAREA}
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							name='currentMedications'
							placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg'
							label='Current Medications'
							fieldType={FormFieldTypes.TEXTAREA}
							disabled={!!patient}
							className='lg:w-1/2'
						/>
					</div>
					{/* Family medical history and past history */}
					<div className='flex flex-col lg:flex-row gap-6'>
						<CustomFormField
							control={form.control}
							name='familyMedicalHistory'
							placeholder='ex: Mother had breast cancer'
							label='Family Medical History'
							fieldType={FormFieldTypes.TEXTAREA}
							disabled={!!patient}
						/>
						<CustomFormField
							control={form.control}
							name='pastMedicalHistory'
							placeholder='ex: Asthma diagnosis in childhood'
							label='Past Medical History'
							fieldType={FormFieldTypes.TEXTAREA}
							disabled={!!patient}
							className='lg:w-1/2'
						/>
					</div>
				</section>

				{/* Identification and Verfication */}
				<section className='space-y-6'>
					<div className='mb-8'>
						<h3 className='sub-header'>Identification and Verfication</h3>
					</div>
					<CustomFormField
						control={form.control}
						name='identificationType'
						placeholder='Select Identification Type'
						label='Identification Type'
						fieldType={FormFieldTypes.SELECT}
						disabled={!!patient}
					>
						{IdentificationTypes.map(option => (
							<SelectItem
								key={option}
								value={option}
								className='cursor-pointer hover:bg-dark-500'
							>
								<p>{option}</p>
							</SelectItem>
						))}
					</CustomFormField>
					<CustomFormField
						control={form.control}
						name='identificationNumber'
						placeholder='ex: 1234567'
						label='Identification Number'
						fieldType={FormFieldTypes.TEXT}
						disabled={!!patient}
					/>
					<CustomFormField
						control={form.control}
						name='identificationDocument'
						label='Scanned Copy of Identification Document'
						fieldType={FormFieldTypes.SKELETON}
						disabled={!!patient}
						renderSkeleton={field => (
							<FormControl>
								<FileUploader
									files={field.value}
									onChange={field.onChange}
									disabled={!!patient}
								/>
							</FormControl>
						)}
					/>
				</section>

				{/* Consent and Privacy */}
				<section className='space-y-6'>
					<div className='mb-8'>
						<h3 className='sub-header'>Consent and Privacy</h3>
					</div>
					<CustomFormField
						control={form.control}
						name='treatmentConsent'
						label='I consent to receive treatment for my health condition.'
						fieldType={FormFieldTypes.CHECKBOX}
						disabled={!!patient}
					/>
					<CustomFormField
						control={form.control}
						name='disclosureConsent'
						label='I consent to the use and disclosure of my health information for treatment purposes.'
						fieldType={FormFieldTypes.CHECKBOX}
						disabled={!!patient}
					/>
					<CustomFormField
						control={form.control}
						name='privacy'
						label='I acknowledge that I have reviewed and agree to the privacy policy'
						fieldType={FormFieldTypes.CHECKBOX}
						disabled={!!patient}
					/>
				</section>
				{!patient && <SubmitBtn isLoading={isLoading}>Save</SubmitBtn>}
			</form>
		</Form>
	)
}

export default PatientForm