'use server'

import { Account, Client, ID, Query } from 'node-appwrite'
import {
	account,
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
import { cookies } from 'next/headers'

export const createAccount = async (user: CreateAccountParams) => {
	try {
		const { email, password, name } = user

		const acc = await account.create(ID.unique(), email, password, name)
		const session = await account.createEmailPasswordSession(email, password)

		cookies().set('user-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})

		return parseStringify({ account: acc })
	} catch (e: any) {
		return parseStringify({ error: e.message || 'Something went wrong' })
	}
}

// TODO delete this function
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

export async function getLoggedInUser() {
	const client = new Client()
		.setEndpoint(ENDPOINT!)
		.setProject(APPWRITE_PROJECT_ID!)

	try {
		const session = cookies().get('user-session')
		if (!session || !session.value) {
			throw new Error('No session')
		}

		client.setSession(session.value)

		const account = new Account(client)
		const user = await account.get()

		return parseStringify({ user })
	} catch (error: any) {
		return { error: error.message }
	}
}
