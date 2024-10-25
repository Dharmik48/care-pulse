import PatientForm from '@/components/PatientForm'
import { getPatientByUserId, getUser } from '@/lib/actions/patient.actions'

import * as Sentry from '@sentry/nextjs'
import {getDoctors} from "@/lib/actions/doctor.actions";

const Register = async ({ params: { id } }: SearchParamProps) => {
	const user = await getUser(id)
	const { patient } = await getPatientByUserId(user.$id)
	const {doctors} = await getDoctors()

	Sentry.metrics.set('user_view_register', user.name)

	return (
		<section className='h-full'>
			<PatientForm user={user} patient={patient} doctors={doctors} />
			<p className='copyright py-8'>
				&copy;carepulse {new Date().getFullYear()}
			</p>
		</section>
	)
}

export default Register