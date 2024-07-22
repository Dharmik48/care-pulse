import { Control } from 'react-hook-form'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { FormFieldTypes } from '@/constants'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { Checkbox } from './ui/checkbox'

interface Props {
	control: Control<any>
	fieldType: FormFieldTypes
	name: string
	label?: string
	placeholder?: string
	description?: string
	iconSrc?: string
	iconAlt?: string
	renderSkeleton?: (field: any) => React.ReactNode
	showTimeSelect?: boolean
	className?: string
	children?: React.ReactNode
	dateFormat?: string
	disabled?: boolean
}

const RenderField = ({ field, props }: { field: any; props: Props }) => {
	const icon = props.iconSrc && (
		<Image
			src={props.iconSrc}
			width={24}
			height={24}
			className='ml-2'
			alt={props.iconAlt || 'icon'}
		/>
	)

	switch (props.fieldType) {
		case FormFieldTypes.TEXT:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{icon}
					<FormControl>
						<Input
							className='shad-input border-0'
							placeholder={props.placeholder}
							{...field}
						/>
					</FormControl>
				</div>
			)
		case FormFieldTypes.TEXTAREA:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{icon}
					<FormControl>
						<Textarea
							className='shad-textArea border-0'
							placeholder={props.placeholder}
							{...field}
						/>
					</FormControl>
				</div>
			)
		case FormFieldTypes.EMAIL:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{icon}
					<FormControl>
						<Input
							type='email'
							className='shad-input border-0'
							placeholder={props.placeholder}
							{...field}
						/>
					</FormControl>
				</div>
			)
		case FormFieldTypes.PHONE:
			return (
				<FormControl>
					<PhoneInput
						defaultCountry='IN'
						className='input-phone'
						international={true}
						withCountryCallingCode={true}
						placeholder={props.placeholder}
						onChange={field.onChange}
						value={field.value}
					/>
				</FormControl>
			)
		case FormFieldTypes.DATE:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{icon}
					<FormControl>
						<DatePicker
							selected={field.value}
							onChange={date => field.onChange(date)}
							showTimeSelect={props.showTimeSelect}
							timeInputLabel='Time: '
							wrapperClassName='date-picker'
							placeholderText={props.placeholder}
							dateFormat={props.dateFormat}
						/>
					</FormControl>
				</div>
			)
		case FormFieldTypes.SKELETON:
			return props.renderSkeleton ? props.renderSkeleton(field) : null
		case FormFieldTypes.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<SelectTrigger className='shad-select-trigger'>
							<SelectValue
								placeholder={
									<div className='flex gap-3'>
										{props.iconSrc && (
											<Image
												src={props.iconSrc}
												height={24}
												width={24}
												alt='icon'
											/>
										)}
										{props.placeholder}
									</div>
								}
							/>
						</SelectTrigger>
						<SelectContent className='shad-select-content'>
							<SelectGroup>{props.children}</SelectGroup>
						</SelectContent>
					</Select>
				</FormControl>
			)
		case FormFieldTypes.CHECKBOX:
			return (
				<FormControl>
					<div className='flex items-center gap-2'>
						<Checkbox
							id={field.name}
							name={field.name}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<FormLabel htmlFor={field.name} className='checkbox-label'>
							{props.label}
						</FormLabel>
					</div>
				</FormControl>
			)
	}
}

const CustomFormField = (props: Props) => {
	const { control, name, fieldType, label, description, className } = props

	return (
		<FormField
			control={control}
			name={name}
			disabled={props.disabled}
			render={({ field }) => (
				<FormItem className={cn('flex-1', className)}>
					{fieldType !== FormFieldTypes.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}
					<RenderField field={field} props={props} />
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage className='shad-error' />
				</FormItem>
			)}
		/>
	)
}

export default CustomFormField
