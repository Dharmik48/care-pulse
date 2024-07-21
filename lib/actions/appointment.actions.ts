'use server'

import {
	APPOINTMENT_COLLECTION_ID,
	DATABASE_ID,
	databases,
} from '../appwrite.config'
import { ID } from 'node-appwrite'
import { parseStringify } from '../utils'

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
	try {
		console.log(DATABASE_ID)

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
