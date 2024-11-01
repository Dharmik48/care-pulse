import {
    getLoggedInUser,
    getPatientByUserId,
} from '@/lib/actions/patient.actions'
import {
    CalendarCheck2,
    CalendarClock,
    CalendarDays,
    CalendarX2,
    Mail,
    PlusCircle,
} from 'lucide-react'
import {redirect} from 'next/navigation'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {Separator} from '@/components/ui/separator'
import {getUserAppointements} from '@/lib/actions/appointment.actions'
import AppointmentSection from '../components/appointment-section'
import {NoDetailsAlert} from "@/components/NoDetailsAlert";

const Patient = async ({params}: SearchParamProps) => {
    const {id} = params
    const {user} = await getLoggedInUser()

    if(!user) return redirect('/login')

    const url = user.labels.includes('doctor')
        ? `/doctor/${user.$id}`
        : `/patient/${user.$id}`

    if (user.$id !== id) return redirect(url)

    const {patient: patientDetails} = await getPatientByUserId(id)
    const {appointments} = await getUserAppointements(id)

    const pendingAppointments = appointments?.filter(
        appointment =>
            appointment.status === 'pending' &&
            new Date(appointment.schedule) >= new Date()
    )
    const scheduledAppointments = appointments?.filter(
        appointment =>
            appointment.status === 'scheduled' &&
            new Date(appointment.schedule) >= new Date()
    )
    const cancelledAppointments = appointments?.filter(
        appointment =>
            appointment.status === 'cancelled' &&
            new Date(appointment.schedule) >= new Date()
    )
    const pastAppointments = appointments?.filter(
        appointment => new Date(appointment.schedule) < new Date()
    )

    return (
        <section>
            <div className='mb-8'>
                <h3 className='text-2xl md:text-4xl font-bold mb-4'>
                    Hi there👋🏻, {user.name}
                </h3>
                <p className='text-dark-700 flex items-center gap-2'>
                    <Mail size={18}/>
                    {user.email}
                </p>
            </div>
            <Separator className='my-6'/>
            <section className='space-y-6'>
                <div className='mb-4 flex justify-between items-center flex-wrap gap-4'>
                    <h3 className='sub-header'>Appointments</h3>
                    <Link href={`/patient/${id}/new-appointment`}>
                        <Button>
                            <PlusCircle size={18} className='mr-1'/> New Appointment
                        </Button>
                    </Link>
                </div>
                {!patientDetails ? (
                    <NoDetailsAlert title={'Personal Details not set!'} link={`/patient/${id}/details`}
                                    description={'to get started with appointments!'}/>
                ) : (
                    <div className='space-y-8'>
                        <AppointmentSection
                            title='Scheduled'
                            emptyMessage='No scheduled appointments'
                            appointments={scheduledAppointments}
                            icon={<CalendarCheck2 size={20} className='text-primary'/>}
                        />
                        <AppointmentSection
                            title='Pending'
                            emptyMessage='No pending appointments'
                            appointments={pendingAppointments}
                            icon={<CalendarClock size={20} className='text-cyan-400'/>}
                        />
                        <AppointmentSection
                            title='Cancelled'
                            emptyMessage='No cancelled appointments'
                            appointments={cancelledAppointments}
                            icon={<CalendarX2 size={20} className='text-destructive'/>}
                        />
                        <AppointmentSection
                            title='Past Appointments'
                            emptyMessage='No appointment history'
                            appointments={pastAppointments}
                            icon={<CalendarDays size={20}/>}
                            showBadge={true}
                        />
                    </div>
                )}
            </section>
        </section>
    )
}

export default Patient