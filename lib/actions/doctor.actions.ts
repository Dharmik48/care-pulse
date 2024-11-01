'use server'

import {
    APPWRITE_PROJECT_ID,
    BUCKET_ID,
    DATABASE_ID,
    databases,
    DOCTOR_COLLECTION_ID, ENDPOINT,
    storage
} from "@/lib/appwrite.config";
import {InputFile} from "node-appwrite/file";
import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {revalidatePath} from "next/cache";
import {Doctor} from "@/types/appwrite.types";

export const registerDoctor = async ({licenseDocument, avatar, ...data}: RegisterDoctorParams) => {
    let uploadedLicense, uploadedAvatar
    try {
        const licenseFile = InputFile.fromBuffer(
            licenseDocument?.get('blobFile') as Blob,
            licenseDocument?.get('fileName') as string
        )

        const avatarFile = InputFile.fromBuffer(
            avatar?.get('blobFile') as Blob,
            avatar?.get('fileName') as string
        )

        // Add image to storage and get url
        uploadedLicense = await storage.createFile(BUCKET_ID!, ID.unique(), licenseFile)
        uploadedAvatar = await storage.createFile(BUCKET_ID!, ID.unique(), avatarFile)

        // add user to db
        // TODO make doc ID same as loggedin user id
        const doctor = await databases.createDocument(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            data.userId,
            {
                ...data,
                licenseDocumentId: uploadedLicense.$id,
                licenseDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedLicense.$id}/view?project=${APPWRITE_PROJECT_ID}`,
                avatarDocumentId: uploadedAvatar.$id,
                avatar: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedAvatar.$id}/view?project=${APPWRITE_PROJECT_ID}`,
            }
        )

        revalidatePath(`/doctor/${data.userId}/`)
        revalidatePath(`/doctor/${data.userId}/appointments`)
        return parseStringify({doctor})
    } catch (error: any) {
        if (uploadedLicense) await storage.deleteFile(BUCKET_ID!, uploadedLicense.$id)
        if (uploadedAvatar) await storage.deleteFile(BUCKET_ID!, uploadedAvatar.$id)
        console.log(error)
        return {error: error.message}
    }
}

export const getDoctorByUserId = async (userId: string) => {
    try {
        const res = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            [Query.startsWith('userId', userId)]
        )

        if (res.documents.length === 0) return parseStringify({doctor: null})

        return parseStringify({doctor: res.documents[0] as Doctor})
    } catch (error: any) {
        return {error: error.message}
    }
}

export const getDoctors = async () => {
    try {
        const res = await databases.listDocuments(DATABASE_ID!, DOCTOR_COLLECTION_ID!)

        return {doctors: res.documents as Doctor[]}
    } catch (error: any) {
        return {error: error.message}
    }
}

export const getDoctor = async (id: string) => {
    try {
        const doctor = await databases.getDocument(DATABASE_ID!, DOCTOR_COLLECTION_ID!, id)

        return {doctor: doctor as Doctor}
    } catch (error: any) {
        return {error: error.message}
    }
}