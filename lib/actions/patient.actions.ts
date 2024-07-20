'use server'

import { ID, Query } from 'node-appwrite'
import {
	APPWRITE_PROJECT_ID,
	BUCKET_ID,
	DATABASE_ID,
	databases,
	ENDPOINT,
	PATIENT_COLLECTION_ID,
	storage,
	users,
} from '../appwrite.config'
import { parseStringify } from '../utils'
import { InputFile } from 'node-appwrite/file'

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		)

		return parseStringify(newUser)
	} catch (error: any) {
		if (error && error.code === 409) {
			const documents = await users.list([Query.equal('email', user.email)])

			return documents.users[0]
		}
	}
}

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId)

		return parseStringify(user)
	} catch (error: any) {
		console.log(error)
	}
}

export const registerUser = async ({
	identificationDocument,
	...user
}: RegisterUserParams) => {
	let uploadedFile
	try {
		const inputFile = InputFile.fromBuffer(
			identificationDocument?.get('blobFile') as Blob,
			identificationDocument?.get('fileName') as string
		)

		// Add image to storage and get url
		uploadedFile = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)

		// add user to db
		const patient = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				identificationDocumentId: uploadedFile.$id,
				identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT_ID}`,
				...user,
			}
		)

		return parseStringify(patient)
	} catch (error: any) {
		if (uploadedFile) await storage.deleteFile(BUCKET_ID!, uploadedFile.$id)

		console.log(error)
	}
}

export const getPatient = async (userId: string) => {
	try {
		const patient = await databases.getDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			userId
		)

		return parseStringify(patient)
	} catch (error: any) {
		console.log(error)
	}
}
