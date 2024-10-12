import PatientForm from '@/components/PatientForm'
import { getUser } from '@/lib/actions/patient.actions'

import * as Sentry from '@sentry/nextjs'

const Register = async ({ params: { id } }: SearchParamProps) => {
	const user = await getUser(id)

	Sentry.metrics.set('user_view_register', user.name)

	return (
		<section className='h-full'>
			<PatientForm user={user} />
			<p className='copyright py-8'>
				&copy;carepulse {new Date().getFullYear()}
			</p>
		</section>
	)
}

export default Register
