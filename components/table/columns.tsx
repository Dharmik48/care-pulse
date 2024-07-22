'use client'

import { Appointment } from '@/types/appwrite.types'
import { ColumnDef } from '@tanstack/react-table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { StatusBadge } from '../StatusBadge'
import { Doctors } from '@/constants'
import Image from 'next/image'
import AppointmentModal from '../AppointmentModal'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
	{
		header: 'ID',
		cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
	},
	{
		accessorKey: 'patient',
		header: 'Patient',
		cell: ({ row }) => (
			<p className='text-14-medium'>{row.original.patient.name}</p>
		),
	},
	{
		accessorKey: 'schedule',
		header: 'Date',
		cell: ({ row }) => (
			<p className='text-14-medium'>
				{formatDateTime(row.getValue('schedule')).dateTime}
			</p>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
	},
	{
		accessorKey: 'primaryPhysician',
		header: 'Doctor',
		cell: ({ row }) => {
			const doctor = Doctors.find(
				doc => doc.name === row.getValue('primaryPhysician')
			)

			return (
				<div className='flex items-center gap-2'>
					{doctor && (
						<Image
							src={doctor.image}
							height={24}
							width={24}
							alt={doctor.name}
							className='size-8'
						/>
					)}
					<p>Dr. {row.getValue('primaryPhysician')}</p>
				</div>
			)
		},
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<div className='flex gap-4'>
				<AppointmentModal
					type={'schedule'}
					patientId={row.original.patient.$id}
					userId={row.original.userId}
					appointment={row.original}
				/>
				<AppointmentModal
					type={'cancel'}
					patientId={row.original.patient.$id}
					userId={row.original.userId}
					appointment={row.original}
					disabled={row.original.status === 'cancelled'}
				/>
			</div>
		),
	},
]
