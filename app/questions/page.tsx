import Image from "next/image";
import Link from "next/link";
import { Cards } from "../components/Cards";
import axios from 'axios';

export const dynamic = 'force-dynamic'

export default async function Questions() {
    
    const { data: { data: quiz }} = await axios.get(`${process.env.CLIENT_URL}/api/quiz`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(quiz)

    return(
        <div>
            <div className="w-full flex gap-8 mb-8 p-10">
                <Cards quiz={quiz} />
                <Link href='/questions/new'>
                    <Image src='/add.webp' alt='Add icon' width={50} height={50} />
                </Link>
            </div>
        </div>
    )

}
          