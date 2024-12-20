import {z} from 'zod'

export const RegistrationFormValidation = z
    .object({
        name: z
            .string()
            .min(2, {message: 'Username must be atleat 2 characters.'}),
        email: z.string().email('Enter a valid email.'),
        password: z
            .string()
            .min(8, {message: 'Must be atleast 8 characters.'})
            .max(20, {message: 'Cannot be more than 20 characters.'})
            .refine(password => /[A-Z]/.test(password), {
                message: 'Must contain atleast 1 uppercase character.',
            })
            .refine(password => /[a-z]/.test(password), {
                message: 'Must contain atleast 1 lowercase character.',
            })
            .refine(password => /[0-9]/.test(password), {
                message: 'Must contain atleast 1 number.',
            })
            .refine(password => /[!@#$%^&*]/.test(password), {
                message: 'Must contain atleast 1 number',
            }),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export const LoginFormValidation = z.object({
    email: z.string().email('Enter a valid email.'),
    password: z
        .string()
        .min(8, {message: 'Must be atleast 8 characters.'})
        .max(20, {message: 'Cannot be more than 20 characters.'})
        .refine(password => /[A-Z]/.test(password), {
            message: 'Must contain atleast 1 uppercase character.',
        })
        .refine(password => /[a-z]/.test(password), {
            message: 'Must contain atleast 1 lowercase character.',
        })
        .refine(password => /[0-9]/.test(password), {
            message: 'Must contain atleast 1 number.',
        })
        .refine(password => /[!@#$%^&*]/.test(password), {
            message: 'Must contain atleast 1 number',
        }),
})

export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .refine(phone => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
    birthDate: z.coerce.date(),
    gender: z.enum(['male', 'female', 'other']),
    address: z
        .string()
        .min(5, 'Address must be at least 5 characters')
        .max(500, 'Address must be at most 500 characters'),
    occupation: z
        .string()
        .min(2, 'Occupation must be at least 2 characters')
        .max(500, 'Occupation must be at most 500 characters'),
    emergencyContactName: z
        .string()
        .min(2, 'Contact name must be at least 2 characters')
        .max(50, 'Contact name must be at most 50 characters'),
    emergencyContactNumber: z
        .string()
        .refine(
            emergencyContactNumber => /^\+\d{10,15}$/.test(emergencyContactNumber),
            'Invalid phone number'
        ),
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    insuranceProvider: z
        .string()
        .min(2, 'Insurance name must be at least 2 characters')
        .max(50, 'Insurance name must be at most 50 characters'),
    insurancePolicyNumber: z
        .string()
        .min(2, 'Policy number must be at least 2 characters')
        .max(50, 'Policy number must be at most 50 characters'),
    allergies: z.string().optional(),
    currentMedications: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine(value => value === true, {
            message: 'You must consent to treatment in order to proceed',
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine(value => value === true, {
            message: 'You must consent to disclosure in order to proceed',
        }),
    privacy: z
        .boolean()
        .default(false)
        .refine(value => value === true, {
            message: 'You must consent to privacy in order to proceed',
        }),
})

export const DoctorFormValidation = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .refine(phone => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
    address: z.string().min(2, 'Address must be at least 2 characters').max(500, 'Address must be at most 500 characters'),
    avatar: z.custom<File[]>().refine(data => data.length === 1, {message: 'Upload 1 document'}),
    licenseNumber: z.string().min(5, 'License number must be at least 2 characters'),
    licenseDocument: z.custom<File[]>().refine(data => data.length === 1, {message: 'Upload 1 document'}),
    terms: z
        .boolean()
        .default(false)
        .refine(value => value === true, {
            message: 'You must agree to the terms and policy',
        }),
})

export const GuideFormValidation = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be at most 100 characters'),
    body: z.string().min(50, 'There must be at least 50 characters').max(4000, 'Max characters limit reached'),
    status: z.string(),
})

export const CreateAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, 'Reason must be at least 2 characters')
        .max(500, 'Reason must be at most 500 characters'),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
})

export const ScheduleAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
})

export const CancelAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, 'Select at least one doctor'),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, 'Reason must be at least 2 characters')
        .max(500, 'Reason must be at most 500 characters'),
})

export function getAppointmentSchema(type: string) {
    switch (type) {
        case 'create':
            return CreateAppointmentSchema
        case 'cancel':
            return CancelAppointmentSchema
        default:
            return ScheduleAppointmentSchema
    }
}