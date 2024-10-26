'use server'

import {
	APPOINTMENT_COLLECTION_ID,
	DATABASE_ID,
	databases,
	messaging,
} from '../appwrite.config'
import { Databases, ID, Models, Query } from 'node-appwrite'
import { formatDateTime, parseStringify } from '../utils'
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

export const getUserAppointements = async (userId: string) => {
	try {
		const appointments = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.equal('userId', userId)]
		)

		return { appointments: appointments.documents as Appointment[] }
	} catch (error: any) {
		return { error: error.message || 'Something went wrong.' }
	}
}

export const getAppointments = async (docId: string) => {
	try {
		const res = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc('$createdAt'), Query.startsWith('primaryPhysician', docId)]
		)

		return parseStringify({appointments: res.documents as Appointment[]})
	} catch (error: any) {
		return {error: error.message || 'Something went wrong.' }
	}
}

export const updateAppointment = async ({
	appointmentId,
	userId,
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

		if (!updateAppointment) throw new Error('Appointment not found')

		const smsMessage = `Hi, it's CarePulse. ${
			type === 'schedule'
				? `Your appointment has been scheduled for ${
						formatDateTime(appointment.schedule).dateTime
				  } with Dr. ${appointment.primaryPhysician}`
				: `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
		}`

		await sendSMSNotification(userId, smsMessage)

		revalidatePath('/admin')
		return parseStringify(updateAppointment)
	} catch (error: any) {
		console.log(error)
	}
}

export const sendSMSNotification = async (userId: string, content: string) => {
	console.log(userId)

	try {
		const message = await messaging.createSms(
			ID.unique(),
			content,
			[],
			[userId]
		)

		return parseStringify(message)
	} catch (error: any) {
		console.log(error)
	}
}