export const GenderOptions = ['male', 'female', 'other']
export const StatusOptions = ['pending', 'scheduled', 'cancelled']
export const ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000

export enum FormFieldTypes {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    DATE = 'date',
    CHECKBOX = 'checkbox',
    EMAIL = 'email',
    PHONE = 'phone',
    SKELETON = 'skeleton',
    SELECT = 'select',
    PASSWORD = 'password',
}

export const PatientFormDefaultValues = {
    name: '',
    email: '',
    phone: '',
    birthDate: new Date(Date.now()),
    gender: 'male' as Gender,
    address: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    primaryPhysician: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    allergies: '',
    currentMedications: '',
    familyMedicalHistory: '',
    pastMedicalHistory: '',
    identificationType: 'Birth Certificate',
    identificationNumber: '',
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacy: false,
}

export const DoctorFormDefaultValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    licenseDocument: [],
    avatar: [],
    terms: false
}

export const IdentificationTypes = [
    'Birth Certificate',
    "Driver's License",
    'Medical Insurance Card/Policy',
    'Military ID Card',
    'National Identity Card',
    'Passport',
    'Resident Alien Card (Green Card)',
    'Social Security Card',
    'State ID Card',
    'Student ID Card',
    'Voter ID Card',
    'Adhar Card',
]

export const StatusIcon = {
    scheduled: '/assets/icons/check.svg',
    pending: '/assets/icons/pending.svg',
    cancelled: '/assets/icons/cancelled.svg',
}