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
						/>
					</FormControl>
				</div>
			)
		case FormFieldTypes.SKELETON:
			return props.renderSkeleton ? props.renderSkeleton(field) : null
		default:
			break
	}
}

const CustomFormField = (props: Props) => {
	const { control, name, fieldType, label, description, className } = props

	return (
		<FormField
			control={control}
			name={name}
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
