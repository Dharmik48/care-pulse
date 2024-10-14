import AppointmentForm from '@/components/AppointmentForm'
import { getPatientByUserId } from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'
import { NoPatientDetailsAlert } from '../../components/no-patient-details-alert'

const NewAppointment = async ({ params: { id } }: SearchParamProps) => {
	const { patient } = await getPatientByUserId(id)

	if (!patient) return <NoPatientDetailsAlert id={id} />

	Sentry.metrics.set('user_view_new-appointment', patient.name)

	return (
		<section className='h-full'>
			<AppointmentForm
				type='create'
				userId={id}
				patientId={patient.$id}
				doctor={patient.primaryPhysician}
			/>
			<div className='flex justify-between text-14-regular items-center mt-8'>
				<p className='copyright'>&copy;carepulse {new Date().getFullYear()}</p>
			</div>
		</section>
	)
}

export default NewAppointment
