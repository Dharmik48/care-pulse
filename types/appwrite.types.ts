import {Models} from 'node-appwrite'

export interface Patient extends Models.Document {
    userId: string
    name: string
    email: string
    phone: string
    birthDate: Date
    gender: Gender
    address: string
    occupation: string
    emergencyContactName: string
    emergencyContactNumber: string
    primaryPhysician: Doctor
    insuranceProvider: string
    insurancePolicyNumber: string
    allergies: string | undefined
    currentMedications: string | undefined
    familyMedicalHistory: string | undefined
    pastMedicalHistory: string | undefined
    identificationType: string | undefined
    identificationNumber: string | undefined
    identificationDocument: FormData | undefined
    privacy: boolean
}

export interface Appointment extends Models.Document {
    patient: Patient
    schedule: Date
    status: Status
    primaryPhysician: Doctor
    reason: string
    note: string
    userId: string
    cancellationReason: string | null
}

export interface Doctor extends Models.Document {
    userId: string
    name: string
    email: string
    phone: string
    address: string
    avatar: string
    avatarDocumentId: string
    licenseNumber: string
    licenseDocumentId: string
    licenseDocumentUrl: string
    terms: boolean
    guides: Guide[]
}

export interface Guide extends Models.Document {
    title: string
    body: string
    doctor: Doctor
    status: 'draft' | 'published'
}