'use server'

import {
	APPOINTMENT_COLLECTION_ID,
	DATABASE_ID,
	databases,
} from '../appwrite.config'
import { ID, Query } from 'node-appwrite'
import { parseStringify } from '../utils'
import { Appointment } from '@/types/appwrite.types'
import { revalidatePath } from 'next/cache'

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
	try {
		const appointment = await databases.createDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointmentData
		)

		return parseStringify(appointment)
	} catch (error: any) {
		console.log(error)
	}
}

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId
		)

		return parseStringify(appointment)
	} catch (error: any) {
		console.log(error)
	}
}

export const getAppointments = async () => {
	try {
		const appointments = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc('$createdAt')]
		)

		return parseStringify(appointments)
	} catch (error: any) {
		console.log(error)
	}
}

export const updateAppointment = async ({
	appointmentId,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updateAppointment = await databases.updateDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		)

		revalidatePath('/admin')
		return parseStringify(updateAppointment)
	} catch (error: any) {
		console.log(error)
	}
}
