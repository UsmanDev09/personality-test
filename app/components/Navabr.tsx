import { Raleway } from "next/font/google"
import Link from "next/link"

const raleway = Raleway({
    weight: '700',
    subsets: ['latin'],
})

export const Navbar = ({ children } : {  children: React.ReactNode }) => {

    return (
        <div className={`p-10 ${raleway.className}`}>
            <Link href='/' className="text-xl pl-12 text-green-800 font-raleway">Quiz app</Link>
            {children}
        </div>
    )
}