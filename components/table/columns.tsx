'use client'

import { Appointment } from '@/types/appwrite.types'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { StatusBadge } from '../StatusBadge'
import { Doctors, ONE_DAY_IN_MILLIS } from '@/constants'
import Image from 'next/image'
import AppointmentModal from '../AppointmentModal'

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
		filterFn: (row, columnId, filterValue) => {
			const schedule = new Date(row.getValue('schedule')).getTime()
			const start = filterValue.start ? filterValue.start.getTime() : 0
			const end = filterValue.end?.getTime() + ONE_DAY_IN_MILLIS

			if (!end) return schedule >= start

			return schedule >= start && schedule <= end
		},
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
		cell: ({ row }) => {
			return (
				<div className='flex gap-4'>
					<AppointmentModal
						type={'schedule'}
						patientId={row.original.patient.$id}
						userId={row.original.patient.userId}
						appointment={row.original}
					/>
					<AppointmentModal
						type={'cancel'}
						patientId={row.original.patient.$id}
						userId={row.original.patient.userId}
						appointment={row.original}
						disabled={row.original.status === 'cancelled'}
					/>
				</div>
			)
		},
	},
]
