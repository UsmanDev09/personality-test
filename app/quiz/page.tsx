import axios from "axios";
import { Quiz } from "../components/Quiz";


export default async function QuizPage() {
    const { data: { data: quiz } } = await axios.get(`${process.env.CLIENT_URL}/api/quiz`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (
        <Quiz quiz={quiz} />
    )
}