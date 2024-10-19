import DoctorForm from '@/components/DoctorForm'
import {getUser} from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'
import {getDoctorByUserId} from "@/lib/actions/doctor.actions";

const Register = async ({params: {id}}: SearchParamProps) => {
    const user = await getUser(id)
    const {doctor} = await getDoctorByUserId(user.$id)

    Sentry.metrics.set('user_view_register', user.name)

    return (
        <section className='h-full'>
            <DoctorForm user={user} doctor={doctor}/>
            <p className='copyright py-8'>
                &copy;carepulse {new Date().getFullYear()}
            </p>
        </section>
    )
}

export default Register