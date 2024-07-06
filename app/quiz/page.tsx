import axios from "axios";
import { Quiz } from "../components/Quiz";


export default async function QuizPage() {
    const { data: { data: questions } } = await axios.get(`${process.env.CLIENT_URL}/api/questions`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (
        <Quiz questions={questions} />
    )
}