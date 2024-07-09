import { z } from 'zod'

export const PatientFormSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be atleat 2 characters.' }),
	email: z.string().email('Enter a valid email.'),
	phone: z
		.string()
		.refine(phone => /^\+\d{10,15}$/.test(phone), 'Invalid phone number.'),
})
