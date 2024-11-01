'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from '@/app/guides/_components/ToolBar'
import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'

const Tiptap = ({
	content,
	onChange,
	disabled,
}: {
	content: string
	onChange: (richText: string) => void
	disabled: boolean
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Heading.configure({
				HTMLAttributes: {
					class: 'font-bold guide-heading',
					levels: [1, 2, 3],
				},
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: 'guide-ul',
				},
			}),
			OrderedList.configure({
				HTMLAttributes: {
					class: 'guide-ol',
				},
			}),
		],
		content,
		editorProps: {
			attributes: {
				class:
					'min-h-40 h-max w-full rounded-md bg-background py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML())
		},
		immediatelyRender: false,
	})

	return (
		<div className={'min-h-40 rounded-md relative'}>
			{editor && (
				<>
					<BubbleMenu
						editor={editor}
						tippyOptions={{ duration: 100 }}
						className={'bg-card'}
					>
						<ToolBar editor={editor} />
					</BubbleMenu>
					{editor.isEmpty && (
						<p className='absolute z-10 mt-2 text-sm text-muted-foreground'>
							Start writing here...
						</p>
					)}
				</>
			)}

			<EditorContent editor={editor} disabled={disabled} />
		</div>
	)
}

export default Tiptap
