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
	privacyConsent: false,
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

export const Doctors = [
	{
		image: '/assets/images/dr-green.png',
		name: 'John Green',
	},
	{
		image: '/assets/images/dr-cameron.png',
		name: 'Leila Cameron',
	},
	{
		image: '/assets/images/dr-livingston.png',
		name: 'David Livingston',
	},
	{
		image: '/assets/images/dr-peter.png',
		name: 'Evan Peter',
	},
	{
		image: '/assets/images/dr-powell.png',
		name: 'Jane Powell',
	},
	{
		image: '/assets/images/dr-remirez.png',
		name: 'Alex Ramirez',
	},
	{
		image: '/assets/images/dr-lee.png',
		name: 'Jasmine Lee',
	},
	{
		image: '/assets/images/dr-cruz.png',
		name: 'Alyana Cruz',
	},
	{
		image: '/assets/images/dr-sharma.png',
		name: 'Hardik Sharma',
	},
]

export const StatusIcon = {
	scheduled: '/assets/icons/check.svg',
	pending: '/assets/icons/pending.svg',
	cancelled: '/assets/icons/cancelled.svg',
}
