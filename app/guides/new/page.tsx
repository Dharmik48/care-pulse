import Image from "next/image";
import Link from "next/link";
import GuideForm from "@/app/guides/_components/GuideForm";

const Guide = () => {
    return (
        <main className='flex min-h-screen'>
            <div className='container'>
                <section className='sub-container justify-between h-full'>
                    <Link href={`/`}>
                        <Image
                            src={'/assets/icons/logo-full.svg'}
                            height={500}
                            width={500}
                            className='mb-12 h-10 w-max'
                            alt='Care pulse logo'
                        />
                    </Link>
                    <GuideForm/>
                    <div className='flex justify-between text-14-regular items-center mt-8'>
                        <p className='copyright'>
                            &copy;carepulse {new Date().getFullYear()}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Guide;