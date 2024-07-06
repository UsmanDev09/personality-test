import { Raleway } from "next/font/google"
import Link from "next/link"
import Image from "next/image"

const raleway = Raleway({
    weight: '700',
    subsets: ['latin'],
})

export const Result = ({ score } : { score: number }) => {
    return ( 
        <div className={`flex flex-col justify-center items-center ${raleway.className}`}>
            <p data-testid="result" className="text-3xl text-center ">{score > 0 ? 'You are an extrovert' : 'You are an introvert'}</p>
            <Image src={`${score > 0 ? 'extrovert.svg' : 'introvert.svg'}` } width={500} height={500} alt='introvert or extrovert image' />
            <Link href='/' role="button" className="text-white p-4 w-28 rounded bg-green-500 hover:bg-green-800">Return to homepage</Link>
        </div>
    )

}