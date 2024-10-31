'use server'

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import {
	DATABASE_ID,
	databases,
	DOCTOR_COLLECTION_ID,
	GUIDE_COLLECTION_ID,
} from '@/lib/appwrite.config'
import { ID } from 'node-appwrite'
import { getDoctorByUserId } from '@/lib/actions/doctor.actions'
import { Guide } from '@/types/appwrite.types'

export const createGuide = async (
	title: string,
	body: string,
	status: string,
	userId: string
) => {
	try {
		const window = new JSDOM('').window
		const purify = DOMPurify(window)
		const purifiedBody = purify.sanitize(body)

		const { doctor } = await getDoctorByUserId(userId)

		if (!doctor) return { error: 'User does not exist' }
		const data = { title, body: purifiedBody, doctor: doctor.$id, status }

		const guide = await databases.createDocument(
			DATABASE_ID!,
			GUIDE_COLLECTION_ID!,
			ID.unique(),
			data
		)

		await databases.updateDocument(
			DATABASE_ID!,
			DOCTOR_COLLECTION_ID!,
			doctor.$id,
			{
				guides: [...doctor.guides, guide.$id],
			}
		)

		return { guide }
	} catch (error: any) {
		return { error: error.message || 'Something went wrong' }
	}
}

export const getGuide = async (id: string) => {
	try {
		const guide = await databases.getDocument(
			DATABASE_ID!,
			GUIDE_COLLECTION_ID!,
			id
		)

		if (!guide) return { error: 'Guide does not exist' }

		return { guide: guide as Guide }
	} catch (error: any) {
		return { error: error.message || 'Something went wrong' }
	}
}

export const updateGuide = async (id: string, data: UpdateGuideParams) => {
	try {
		const guide = await databases.updateDocument(
			DATABASE_ID!,
			GUIDE_COLLECTION_ID!,
			id,
			data
		)

		return { guide: guide as Guide }
	} catch (error: any) {
		return { error: error.message || 'Something went wrong' }
	}
}
