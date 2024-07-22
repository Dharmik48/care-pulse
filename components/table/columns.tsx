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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { StatusBadge } from '../StatusBadge'
import { Doctors } from '@/constants'
import Image from 'next/image'
import AppointmentModal from '../AppointmentModal'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='pl-0 hover:underline'
			>
				ID
				<ArrowUpDown size={16} className='ml-2' />
			</Button>
		),
		cell: ({ row }) => <p className='text-14-medium'>{row.index + 1}</p>,
		sortingFn: (rowA, rowB, columnId) =>
			rowA.index > rowB.index
				? 1
				: rowA.index < rowB.original[columnId]
				? -1
				: 0,
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
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='pl-0 hover:underline'
			>
				Date
				<ArrowUpDown size={16} className='ml-2' />
			</Button>
		),
		cell: ({ row }) => (
			<p className='text-14-medium'>
				{formatDateTime(row.getValue('schedule')).dateTime}
			</p>
		),
		sortingFn: 'datetime',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
		filterFn: (row, columnId, filterValue) =>
			filterValue.indexOf(row.getValue('status')) >= 0,
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
