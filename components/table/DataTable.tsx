'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusOptions } from '@/constants'
import { Dot, Filter, Stethoscope } from 'lucide-react'
import { Input } from '../ui/input'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const [filteredStatus, setFilteredStatus] = useState<Status[]>([
		'cancelled',
		'pending',
		'scheduled',
	])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
			columnFilters,
		},
	})

	useEffect(() => {
		table.getColumn('status')?.setFilterValue(filteredStatus)
	}, [filteredStatus])

	return (
		<div className='z-10 w-full space-y-4'>
			<div className='flex items-center'>
				<div className='flex rounded-md border border-dark-500 bg-dark-400 items-center'>
					<Stethoscope size={20} className='ml-3' />
					<Input
						placeholder='Search Doctor'
						value={
							(table
								.getColumn('primaryPhysician')
								?.getFilterValue() as string) ?? ''
						}
						onChange={event =>
							table
								.getColumn('primaryPhysician')
								?.setFilterValue(event.target.value)
						}
						className='shad-input border-0'
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='ml-auto !flex gap-1 shad-select-trigger'
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

			<div className='data-table'>
				<Table className='shad-table'>
					<TableHeader className='bg-dark-200'>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow
								className='shad-row-header border-none'
								key={headerGroup.id}
							>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									className='shad-table-row'
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className='table-actions'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className='shad-gray-btn'
					>
						<Image
							src={'/assets/icons/arrow.svg'}
							width={24}
							height={24}
							alt='arrow'
						/>
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className='shad-gray-btn'
					>
						<Image
							src={'/assets/icons/arrow.svg'}
							width={24}
							height={24}
							alt='arrow'
							className='rotate-180'
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}
