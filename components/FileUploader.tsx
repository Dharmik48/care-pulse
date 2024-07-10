'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { convertFileToUrl } from '@/lib/utils'

interface Props {
	files: File[] | undefined
	onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: Props) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		onChange(acceptedFiles)
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps()} className='file-upload'>
			<input {...getInputProps()} />
			{files && files.length > 0 ? (
				<div className='relative'>
					{isDragActive && (
						<div className='absolute inset-0 flex items-center justify-center flex-col bg-dark-400 gap-2'>
							<Image
								src='/assets/icons/upload.svg'
								height={36}
								width={36}
								alt='upload icon'
							/>
							<p>
								<span className='text-green-400'>Drop</span> the file here ...
							</p>
						</div>
					)}

					<Image
						src={convertFileToUrl(files[0])}
						height={500}
						width={500}
						alt='uploaded image'
					/>
				</div>
			) : (
				<>
					<Image
						src='/assets/icons/upload.svg'
						height={36}
						width={36}
						alt='upload icon'
					/>

					{isDragActive ? (
						<p>
							<span className='text-green-400'>Drop</span> the file here ...
						</p>
					) : (
						<p>
							<span className='text-green-400'>Click to upload</span> or drag
							and drop
						</p>
					)}
					<p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
				</>
			)}
		</div>
	)
}

export default FileUploader
