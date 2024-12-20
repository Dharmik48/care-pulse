import AppointmentForm from '@/components/AppointmentForm'
import {getPatientByUserId} from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'
import {NoDetailsAlert} from "@/components/NoDetailsAlert";
import {getDoctors} from "@/lib/actions/doctor.actions";

const NewAppointment = async ({params: {id}}: SearchParamProps) => {
    const {patient} = await getPatientByUserId(id)

    if (!patient) return <NoDetailsAlert title={'Personal Details not set!'} link={`/patient/${id}/details`}
                                         description={'to get started with appointments!'}/>

    Sentry.metrics.set('user_view_new-appointment', patient.name)
    const {doctors} = await getDoctors()

    return (
        <section className='h-full'>
            <AppointmentForm
                type='create'
                userId={id}
                patientId={patient.$id}
                doctor={patient.primaryPhysician.$id}
                doctors={doctors}
            />
            <div className='flex justify-between text-14-regular items-center mt-8'>
                <p className='copyright'>&copy;carepulse {new Date().getFullYear()}</p>
            </div>
        </section>
    )
}

export default NewAppointment