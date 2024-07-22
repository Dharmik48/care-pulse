'use client'

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusOptions } from '@/constants'
import { Dot, Filter, Stethoscope } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DatePicker from 'react-datepicker'
import { Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const AdminFilters = ({ table }: { table: Table<any> }) => {
	const [dates, setDates] = useState<{
		start: Date | null
		end: Date | null
	}>({
		start: null,
		end: null,
	})
	const [filteredStatus, setFilteredStatus] = useState<Status[]>([
		'cancelled',
		'pending',
		'scheduled',
	])

	useEffect(() => {
		table.getColumn('status')?.setFilterValue(filteredStatus)
	}, [filteredStatus])

	useEffect(() => {
		table.getColumn('schedule')?.setFilterValue(dates)
	}, [dates])
	return (
		<div className='flex md:items-end justify-between flex-col-reverse gap-4 md:flex-row'>
			<div className='flex rounded-md border border-dark-500 bg-dark-400 items-center'>
				<Stethoscope size={20} className='ml-3' />
				<Input
					placeholder='Search Doctor'
					value={
						(table.getColumn('primaryPhysician')?.getFilterValue() as string) ??
						''
					}
					onChange={event =>
						table
							.getColumn('primaryPhysician')
							?.setFilterValue(event.target.value)
					}
					className='shad-input border-0'
				/>
			</div>
			<div className='flex gap-4 items-end justify-between flex-wrap md:flex-nowrap'>
				<div className='flex gap-4'>
					<div className='space-y-2'>
						<label htmlFor='start-date'>From</label>
						<div className='flex rounded-md border border-dark-500 bg-dark-400'>
							<DatePicker
								id='start-date'
								selected={dates.start}
								onChange={date => setDates(prev => ({ ...prev, start: date }))}
								wrapperClassName='date-picker'
								placeholderText={'Start Date'}
								dateFormat={'dd/MM/yyyy'}
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<label htmlFor='end-date'>To</label>
						<div className='flex rounded-md border border-dark-500 bg-dark-400'>
							<DatePicker
								id='end-date'
								selected={dates.end}
								onChange={date => setDates(prev => ({ ...prev, end: date }))}
								wrapperClassName='date-picker'
								placeholderText={'End Date'}
								dateFormat={'dd/MM/yyyy'}
							/>
						</div>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='!flex gap-1 shad-select-trigger'
						>
							<div className='relative'>
								{filteredStatus.length !== 3 && (
									<Dot
										className='text-green-500 absolute right-0 top-0 translate-x-1/2 -translate-y-1/2'
										size={32}
									/>
								)}
								<Filter size={16} />
							</div>
							<span>Status</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='shad-select-content'>
						{StatusOptions.map(status => {
							return (
								<DropdownMenuCheckboxItem
									key={status}
									className='capitalize cursor-pointer hover:bg-dark-500'
									checked={filteredStatus.indexOf(status as Status) >= 0}
									onCheckedChange={value => {
										if (value && filteredStatus.indexOf(status as Status) >= 0)
											return
										if (value)
											return setFilteredStatus(prev => [
												...prev,
												status as Status,
											])
										if (filteredStatus.indexOf(status as Status) >= 0)
											return setFilteredStatus(prev =>
												prev.filter(el => el !== status)
											)
									}}
								>
									{status}
								</DropdownMenuCheckboxItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

export default AdminFilters
