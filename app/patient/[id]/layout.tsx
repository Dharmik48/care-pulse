import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'
import Navbar from '@/components/Navbar'

interface SettingsLayoutProps {
	children: React.ReactNode
	params: { [key: string]: string }
}

export default function SettingsLayout({
	children,
	params,
}: SettingsLayoutProps) {
	const { id } = params

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: `/patient/${id}`,
		},
		{
			title: 'Personal Details',
			href: `/patient/${id}/details`,
		},
		{
			title: 'New Appointment',
			href: `/patient/${id}/new-appointment`,
		},
	]

	return (
		<>
			{/* <div className='md:hidden'>
				<Image
					src='/examples/forms-light.png'
					width={1280}
					height={791}
					alt='Forms'
					className='block dark:hidden'
				/>
				<Image
					src='/examples/forms-dark.png'
					width={1280}
					height={791}
					alt='Forms'
					className='hidden dark:block'
				/>
			</div> */}
			<div className='space-y-6 p-10'>
				<Navbar />
				<div className='space-y-0.5'>
					<h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
					<p className='text-muted-foreground'>
						Manage your account settings and appointments.
					</p>
				</div>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl'>{children}</div>
				</div>
			</div>
		</>
	)
}
