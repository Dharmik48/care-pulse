import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'

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
			href: `/doctor/${id}`,
		},
		{
			title: 'Professional Details',
			href: `/doctor/${id}/details`,
		},
		{
			title: 'Manage Appointments',
			href: `/doctor/${id}/appointments`,
		},
		{
			title: 'Guides',
			href: `/doctor/${id}/guides`,
		},
	]

	return (
		<div className='space-y-6 p-10'>
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
				<div className='flex-1'>{children}</div>
			</div>
		</div>
	)
}
