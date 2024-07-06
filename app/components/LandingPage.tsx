import Link from "next/link";
import Image from "next/image";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  weight: '700',
  subsets: ['latin'],
})

export const LandingPage = () => {
    return (
        <main className={`flex flex-row min-h-screen ${raleway.className}`}>
            <div className="flex-1 flex flex-col justify-center items-center">
                <h1 className="text-3xl md:text-5xl text-center mb-4">Are you an Introvert or an Extrovert?</h1>
                <p className="text-center mb-8">Take this quiz to discover your personality type!</p>
                <Link href='/quiz'>
                    <p className="bg-green-500 text-white py-4 px-8 rounded hover:bg-green-800">Start Quiz</p>
                </Link>
            </div>
            <div className="flex-1 hidden md:flex">
                <Image src='/side.png' alt="Avatar" className="object-cover w-full h-full" width={400} height={400} />
            </div>
        </main>
    );
}
