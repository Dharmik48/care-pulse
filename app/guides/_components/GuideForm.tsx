'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import SubmitBtn from '@/components/SubmitBtn'
import { useState } from 'react'
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GuideFormValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import Tiptap from '@/components/TipTap'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { createGuide, updateGuide } from '@/lib/actions/guide.actions'
import { Guide } from '@/types/appwrite.types'

const GuideForm = ({ userId, guide }: { userId: string; guide?: Guide }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof GuideFormValidation>>({
		resolver: zodResolver(GuideFormValidation),
		defaultValues: {
			title: guide ? guide.title : '',
			body: guide ? guide.body : '',
			status: 'draft',
		},
	})

	const onSubmit = async (values: z.infer<typeof GuideFormValidation>) => {
		setIsLoading(true)
		const { title, body, status } = values

		let error = undefined
		let updatedGuide = undefined

		try {
			if (guide) {
				const res = await updateGuide(guide.$id, { title, body, status })
				error = res.error
				updatedGuide = res.guide
			} else {
				const res = await createGuide(title, body, status, userId)
				error = res.error
				updatedGuide = res.guide
			}

			if (error) throw new Error(error)
			if (!updatedGuide) throw new Error('Could not create guide')

			if (status === 'published') router.push(`/doctor/${userId}/guides`)
			else if (!!guide) router.refresh()
			else router.push(`/doctor/${userId}/guides/${updatedGuide.$id}`)
		} catch (error: any) {
			toast({
				title: 'Oh no! Something went wrong.',
				description: error.message,
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className={'mb-auto'}>
			{/*<div className="mb-8">*/}
			{/*  <h3 className="text-4xl font-bold mb-4">Write a new guide📝,</h3>*/}
			{/*  <p className="text-dark-700">Share information about healthcare.</p>*/}
			{/*</div>*/}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col space-y-6'
				>
					<div className='flex gap-4 flex-col-reverse lg:flex-row'>
						<FormField
							control={form.control}
							name='title'
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className='flex-1'>
									<div className='flex rounded-md bg-dark-400'>
										<FormControl>
											<Input
												className='border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-3xl'
												placeholder={'Title'}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage className='shad-error' />
								</FormItem>
							)}
						/>
						<div className='flex gap-2'>
							<SubmitBtn
								variant={'outline'}
								isLoading={isLoading && form.getValues('status') === 'draft'}
								className={'w-fit'}
								onClick={() => form.setValue('status', 'draft')}
							>
								Save as Draft
							</SubmitBtn>
							<SubmitBtn
								isLoading={
									isLoading && form.getValues('status') === 'published'
								}
								className={'w-fit'}
								onClick={() => form.setValue('status', 'published')}
							>
								Publish
							</SubmitBtn>
						</div>
					</div>
					<Separator className='my-6' />
					<FormField
						control={form.control}
						name='body'
						disabled={isLoading}
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormMessage className='shad-error' />
								<FormControl>
									<Tiptap
										content={field.value}
										onChange={field.onChange}
										disabled={isLoading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</section>
	)
}

export default GuideForm
