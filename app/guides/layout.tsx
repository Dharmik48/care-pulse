import Navbar from '@/components/Navbar'

const GuidesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex min-h-screen'>
			<div className='container'>
				<section className='sub-container space-y-8 max-w-screen-lg h-full'>
					<Navbar />
					{children}
				</section>
			</div>
		</main>
	)
}

export default GuidesLayout
