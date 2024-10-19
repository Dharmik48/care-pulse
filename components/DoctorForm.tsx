'use client'

import {useState} from 'react'
import CustomFormField from './CustomFormField'
import SubmitBtn from './SubmitBtn'
import {Form, FormControl} from './ui/form'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {DoctorFormValidation} from '@/lib/validations'
import {zodResolver} from '@hookform/resolvers/zod'
import {
    DoctorFormDefaultValues,
    FormFieldTypes,
} from '@/constants'
import FileUploader from './FileUploader'
import {useToast} from './hooks/use-toast'
import {Doctor} from '@/types/appwrite.types'
import {registerDoctor} from "@/lib/actions/doctor.actions";
import {useRouter} from "next/navigation";

const DoctorForm = ({
                        user,
                        doctor,
                    }: {
    user: User
    doctor: null | Doctor
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof DoctorFormValidation>>({
        resolver: zodResolver(DoctorFormValidation),
        defaultValues: doctor
            ? {...doctor, licenseDocument: [], avatar: []}
            : {
                ...DoctorFormDefaultValues,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            },
    })

    const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
        setIsLoading(true)

        let licenseFormData
        let avatarFormData
        // if image of doc is present convert it to blob and form data
        if (
            values.avatar &&
            values.avatar.length > 0
        ) {
            const blob = new Blob([values.avatar[0]], {
                type: values.avatar[0].type,
            })

            avatarFormData = new FormData()
            avatarFormData.append('blobFile', blob)
            avatarFormData.append('fileName', values.avatar[0].name)
        }

        if (values.licenseDocument && values.licenseDocument.length > 0) {
            const blob = new Blob([values.licenseDocument[0]], {
                type: values.licenseDocument[0].type,
            })

            licenseFormData = new FormData()
            licenseFormData.append('blobFile', blob)
            licenseFormData.append('fileName', values.licenseDocument[0].name)
        }

        try {
            // extract values from form
            const data: RegisterDoctorParams = {
                ...values,
                userId: user.$id,
                licenseDocument: licenseFormData,
                avatar: avatarFormData
            }
            // add to database

            const {doctor, error} = await registerDoctor(data)

            if (error) throw new Error(error.message)

            // toast on success
            toast({
                title: 'Action success.',
                description: 'Details saved successfully',
            })
            router.push(`/doctor/${user.$id}/appointments`)
        } catch (error: any) {
            toast({title: 'Something went wrong', description: error.message, variant: 'destructive'})
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
                        disabled={!!doctor}
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
                            disabled={!!doctor}
                        />
                        <CustomFormField
                            control={form.control}
                            name='phone'
                            placeholder='+00 0342 0453 34'
                            label='Phone number'
                            fieldType={FormFieldTypes.PHONE}
                            disabled={!!doctor}
                            className='lg:w-1/2'
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
                            disabled={!!doctor}
                        />
                    </div>
                    <CustomFormField
                        control={form.control}
                        name='avatar'
                        label='Profile Picture'
                        fieldType={FormFieldTypes.SKELETON}
                        disabled={!!doctor}
                        renderSkeleton={field => (
                            <FormControl>
                                <FileUploader
                                    files={field.value}
                                    onChange={field.onChange}
                                    disabled={!!doctor}
                                />
                            </FormControl>
                        )}
                    />
                </section>
                {/* Identification and Verification */}
                <section className='space-y-6'>
                    <div className='mb-8'>
                        <h3 className='sub-header'>Identification and Verification</h3>
                    </div>
                    <CustomFormField
                        control={form.control}
                        name='licenseNumber'
                        placeholder='ex: 1234567'
                        label='License Number'
                        fieldType={FormFieldTypes.TEXT}
                        disabled={!!doctor}
                    />
                    <CustomFormField
                        control={form.control}
                        name='licenseDocument'
                        label='Scanned Copy of your License'
                        fieldType={FormFieldTypes.SKELETON}
                        disabled={!!doctor}
                        renderSkeleton={field => (
                            <FormControl>
                                <FileUploader
                                    files={field.value}
                                    onChange={field.onChange}
                                    disabled={!!doctor}
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
                        name='terms'
                        label='I acknowledge that I have reviewed and agree to the privacy policy'
                        fieldType={FormFieldTypes.CHECKBOX}
                        disabled={!!doctor}
                    />
                </section>
                {!doctor && <SubmitBtn isLoading={isLoading}>Save</SubmitBtn>}
            </form>
        </Form>
    )
}

export default DoctorForm